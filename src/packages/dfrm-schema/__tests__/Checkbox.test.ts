import { CheckboxSchema } from "../Checkbox";
import { expectError, expectNoError } from "../TestUtils";

const errorMessages = {
  Required: { en: "this field is required" },
};

const options = {
  locale: "en",
  root: {},
  path: [],
  namePrefix: "",
};

describe("Checkbox", () => {
  test("type validation", async () => {
    const schema = new CheckboxSchema({});
    expectError(await schema.render({ ...options, fixValue: false, value: 0 }), {
      type: "InvalidType",
      details: { expectedType: "boolean" },
      message: "",
    });
    expectNoError(await schema.render({ ...options, value: 0 }));
    expectNoError(await schema.render({ ...options, value: true }));
    expectNoError(await schema.render({ ...options, value: false }));
  });

  test("optional field validation", async () => {
    const schema = new CheckboxSchema({});
    expectNoError(await schema.render({ ...options, value: undefined }));
    expectNoError(await schema.render({ ...options, value: true }));
  });

  test("required field validation", async () => {
    const schema = new CheckboxSchema({ required: true, errorMessages });
    expectError(await schema.render({ ...options, value: undefined }), {
      type: "Required",
      details: {},
      message: "this field is required",
    });
    expectNoError(await schema.render({ ...options, value: true }));
  });

  test("default value", async () => {
    const schema = new CheckboxSchema({
      required: true,
      defaultValue: false,
      errorMessages,
    });
    expectError(await schema.render({ ...options, value: null }), {
      type: "Required",
      details: {},
      message: "this field is required",
    });
    expectNoError(await schema.render({ ...options, value: undefined }));
    expectNoError(await schema.render({ ...options, value: true }));
  });
});
