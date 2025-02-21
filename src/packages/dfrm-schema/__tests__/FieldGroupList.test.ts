import { FieldGroupListSchema } from "../FieldGroupList";
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

describe("FieldGroupList", () => {
  test("type validation", async () => {
    const schema = new FieldGroupListSchema({
      key: "v",
      label: {},
      children: [],
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
    expectError(
      await schema.render({
        ...options,
        fixValue: false,
        value: { v: [0] },
      }),
      {
        type: "InvalidItemType",
        details: { expectedType: "object" },
        message: "",
      },
    );
    expectNoError(await schema.render({ ...options, value: { v: 0 } }));
    expectNoError(await schema.render({ ...options, value: { v: [0] } }));
    expectNoError(await schema.render({ ...options, value: { v: [] } }));
  });

  test("min length validation", async () => {
    const schema = new FieldGroupListSchema({
      key: "v",
      label: {},
      minLength: 3,
      children: [],
      errorMessages,
    });
    expectError(
      await schema.render({
        ...options,
        fixValue: false,
        value: { v: [{}, {}] },
      }),
      {
        type: "MinLength",
        details: { minLength: 3 },
        message: "the min length is 3",
      },
    );
    expectNoError(await schema.render({ ...options, value: { v: [{}, {}] } }));
    expectValue(await schema.render({ ...options, value: { v: [{}, {}] } }), {
      v: [{}, {}, {}],
    });
    expectNoError(await schema.render({ ...options, value: { v: [{}, {}, {}] } }));
  });

  test("max length validation", async () => {
    const schema = new FieldGroupListSchema({
      key: "v",
      label: {},
      maxLength: 3,
      children: [],
      errorMessages,
    });
    expectError(
      await schema.render({
        ...options,
        fixValue: false,
        value: { v: [{}, {}, {}, {}] },
      }),
      {
        type: "MaxLength",
        details: { maxLength: 3 },
        message: "the max length is 3",
      },
    );
    expectNoError(await schema.render({ ...options, value: { v: [{}, {}, {}, {}] } }));
    expectValue(await schema.render({ ...options, value: { v: [{}, {}, {}, {}] } }), {
      v: [{}, {}, {}],
    });
    expectNoError(await schema.render({ ...options, value: { v: [{}, {}, {}] } }));
  });
});
