import { ConditionalSchema } from "../Conditional";
import type { EmptyResult } from "../Empty";
import type { RenderInputResult } from "../Input";
import { LongTextSchema } from "../LongText";
import { ShortTextSchema } from "../ShortText";

describe("Conditional", () => {
  test("conditional with only then", async () => {
    const schema = new ConditionalSchema<void, RenderInputResult<void>>({
      template: "EQ(MOD({a}, 2), 0)",
      then: new ShortTextSchema({}),
    });
    const result1 = await schema.render({
      locale: "en",
      root: { a: 6 },
      path: [],
      namePrefix: "",
      value: undefined,
    });
    expect(result1).toHaveProperty("type", "ShortText");
    const result2 = await schema.render({
      locale: "en",
      root: { a: 5 },
      path: [],
      namePrefix: "",
      value: undefined,
    });
    expect(result2).toHaveProperty("type", "Empty");
  });

  test("conditional with then and else", async () => {
    const schema = new ConditionalSchema<void, RenderInputResult<void>>({
      template: "EQ(MOD({a}, 2), 0)",
      then: new ShortTextSchema({}),
      else: new LongTextSchema({}),
    });
    const result1 = await schema.render({
      locale: "en",
      root: { a: 6 },
      path: [],
      namePrefix: "",
      value: undefined,
    });
    expect(result1).toHaveProperty("type", "ShortText");
    const result2 = await schema.render({
      locale: "en",
      root: { a: 5 },
      path: [],
      namePrefix: "",
      value: undefined,
    });
    expect(result2).toHaveProperty("type", "LongText");
  });

  test("nest conditional with then and else", async () => {
    const schema = new ConditionalSchema<void, RenderInputResult<void> | EmptyResult<void>>({
      template: "EQ({a}, 1)",
      then: new ConditionalSchema<void, RenderInputResult<void> | EmptyResult<void>>({
        template: "EQ({b}, 1)",
        then: new ShortTextSchema({}),
        else: new LongTextSchema({}),
      }),
      else: new LongTextSchema({}),
    });
    const result1 = await schema.render({
      locale: "en",
      root: { a: 1, b: 1 },
      path: [],
      namePrefix: "",
      value: undefined,
    });
    expect(result1).toHaveProperty("type", "ShortText");
    const result2 = await schema.render({
      locale: "en",
      root: { a: 1, b: 2 },
      path: [],
      namePrefix: "",
      value: undefined,
    });
    expect(result2).toHaveProperty("type", "LongText");
    const result3 = await schema.render({
      locale: "en",
      root: { a: 2, b: 1 },
      path: [],
      namePrefix: "",
      value: undefined,
    });
    expect(result3).toHaveProperty("type", "LongText");
  });
});
