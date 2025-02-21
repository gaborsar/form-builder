import { ShortTextSchema } from "../ShortText";
import { expectError, expectNoError } from "../TestUtils";

const errorMessages = {
  Required: { en: "this field is required" },
  MinLength: { en: "the min length is {minLength}" },
  MaxLength: { en: "the max length is {maxLength}" },
  Pattern: { en: "must match pattern" },
};

const options = {
  locale: "en",
  root: {},
  path: [],
  namePrefix: "",
};

describe("ShortText", () => {
  test("type validation", async () => {
    const schema = new ShortTextSchema({});
    expectError(await schema.render({ ...options, fixValue: false, value: 0 }), {
      type: "InvalidType",
      details: { expectedType: "string" },
      message: "",
    });
    expectNoError(await schema.render({ ...options, value: 0 }));
    expectNoError(await schema.render({ ...options, value: "x" }));
  });

  test("optional field validation", async () => {
    const schema = new ShortTextSchema({});
    expectNoError(await schema.render({ ...options, value: undefined }));
    expectNoError(await schema.render({ ...options, value: "x" }));
  });

  test("required field validation", async () => {
    const schema = new ShortTextSchema({ required: true, errorMessages });
    expectError(await schema.render({ ...options, value: undefined }), {
      type: "Required",
      details: {},
      message: "this field is required",
    });
    expectNoError(await schema.render({ ...options, value: "x" }));
  });

  test("default value", async () => {
    const schema = new ShortTextSchema({
      required: true,
      defaultValue: "x",
      errorMessages,
    });
    expectError(await schema.render({ ...options, value: null }), {
      type: "Required",
      details: {},
      message: "this field is required",
    });
    expectNoError(await schema.render({ ...options, value: undefined }));
    expectNoError(await schema.render({ ...options, value: "x" }));
  });

  test("min length validation", async () => {
    const schema = new ShortTextSchema({ minLength: 3, errorMessages });
    expectError(await schema.render({ ...options, value: "xx" }), {
      type: "MinLength",
      details: { minLength: 3 },
      message: "the min length is 3",
    });
    expectNoError(await schema.render({ ...options, value: "xxx" }));
  });

  test("max length validation", async () => {
    const schema = new ShortTextSchema({ maxLength: 3, errorMessages });
    expectError(await schema.render({ ...options, value: "xxxx" }), {
      type: "MaxLength",
      details: { maxLength: 3 },
      message: "the max length is 3",
    });
    expectNoError(await schema.render({ ...options, value: "xxx" }));
  });

  test("pattern validation", async () => {
    const schema = new ShortTextSchema({
      pattern: "^\\d{3}$",
      errorMessages,
    });
    expectError(await schema.render({ ...options, value: "00" }), {
      type: "Pattern",
      details: { pattern: "^\\d{3}$" },
      message: "must match pattern",
    });
    expectError(await schema.render({ ...options, value: "0000" }), {
      type: "Pattern",
      details: { pattern: "^\\d{3}$" },
      message: "must match pattern",
    });
    expectNoError(await schema.render({ ...options, value: "000" }));
  });
});
