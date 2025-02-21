import { EmailSchema } from "../Email";
import { expectError, expectNoError } from "../TestUtils";

const errorMessages = {
  Required: { en: "this field is required" },
  InvalidFormat: { en: "must match format" },
};

const options = {
  locale: "en",
  root: {},
  path: [],
  namePrefix: "",
};

describe("Email", () => {
  test("type and format validation", async () => {
    const schema = new EmailSchema({});
    expectError(await schema.render({ ...options, value: "x" }), {
      type: "InvalidFormat",
      details: { expectedFormat: "email" },
      message: "",
    });
    expectError(await schema.render({ ...options, fixValue: false, value: 0 }), {
      type: "InvalidType",
      details: { expectedType: "string" },
      message: "",
    });
    expectNoError(await schema.render({ ...options, value: "foo@bar.com" }));
  });

  test("optional field validation", async () => {
    const schema = new EmailSchema({});
    expectNoError(await schema.render({ ...options, value: undefined }));
    expectNoError(await schema.render({ ...options, value: "foo@bar.com" }));
  });

  test("required field validation", async () => {
    const schema = new EmailSchema({ required: true, errorMessages });
    expectError(await schema.render({ ...options, value: undefined }), {
      type: "Required",
      details: {},
      message: "this field is required",
    });
    expectNoError(await schema.render({ ...options, value: "foo@bar.com" }));
  });

  test("default value", async () => {
    const schema = new EmailSchema({
      required: true,
      defaultValue: "foo@bar.com",
      errorMessages,
    });
    expectError(await schema.render({ ...options, value: null }), {
      type: "Required",
      details: {},
      message: "this field is required",
    });
    expectNoError(await schema.render({ ...options, value: undefined }));
    expectNoError(await schema.render({ ...options, value: "foo@bar.com" }));
  });
});
