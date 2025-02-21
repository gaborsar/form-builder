import { FieldListSchema } from "../FieldList";
import { ShortTextSchema } from "../ShortText";
import { expectError, expectNoError, expectValue } from "../TestUtils";

const errorMessages = {
  MinLength: { en: "the min length is {minLength}" },
  MaxLength: { en: "the max length is {maxLength}" },
  Unique: { en: "must be unique" },
};

const options = {
  locale: "en",
  root: {},
  path: [],
  namePrefix: "",
};

describe("FieldList", () => {
  test("type validation", async () => {
    const schema = new FieldListSchema({
      key: "v",
      label: {},
      child: new ShortTextSchema({}),
    });
    expectError(
      await schema.render({
        ...options,
        fixValue: false,
        value: { v: 0 },
      }),
      {
        type: "InvalidType",
        details: { expectedType: "array" },
        message: "",
      },
    );
    expectNoError(await schema.render({ ...options, value: { v: 0 } }));
    expectNoError(await schema.render({ ...options, value: { v: [] } }));
  });

  test("min length validation", async () => {
    const schema = new FieldListSchema({
      key: "v",
      label: {},
      minLength: 3,
      child: new ShortTextSchema({}),
      errorMessages,
    });
    expectError(
      await schema.render({
        ...options,
        fixValue: false,
        value: { v: ["a", "b"] },
      }),
      {
        type: "MinLength",
        details: { minLength: 3 },
        message: "the min length is 3",
      },
    );
    expectNoError(await schema.render({ ...options, value: { v: ["a", "b"] } }));
    expectValue(await schema.render({ ...options, value: { v: ["a", "b"] } }), {
      v: ["a", "b", null],
    });
    expectNoError(await schema.render({ ...options, value: { v: ["a", "b", "c"] } }));
  });

  test("max length validation", async () => {
    const schema = new FieldListSchema({
      key: "v",
      label: {},
      maxLength: 3,
      child: new ShortTextSchema({}),
      errorMessages,
    });
    expectError(
      await schema.render({
        ...options,
        fixValue: false,
        value: { v: ["a", "b", "c", "d"] },
      }),
      {
        type: "MaxLength",
        details: { maxLength: 3 },
        message: "the max length is 3",
      },
    );
    expectNoError(
      await schema.render({
        ...options,
        value: { v: ["a", "b", "c", "d"] },
      }),
    );
    expectValue(
      await schema.render({
        ...options,
        value: { v: ["a", "b", "c", "d"] },
      }),
      { v: ["a", "b", "c"] },
    );
    expectNoError(await schema.render({ ...options, value: { v: ["a", "b", "c"] } }));
  });

  test("unique validation", async () => {
    const schema = new FieldListSchema({
      key: "v",
      label: {},
      unique: true,
      child: new ShortTextSchema({}),
      errorMessages,
    });
    expectError(
      await schema.render({
        ...options,
        fixValue: false,
        value: { v: ["a", "a"] },
      }),
      {
        type: "Unique",
        details: {},
        message: "must be unique",
      },
    );
    expectNoError(await schema.render({ ...options, value: { v: ["a", "a"] } }));
    expectNoError(await schema.render({ ...options, value: { v: ["a", "b"] } }));
  });
});
