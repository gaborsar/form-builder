import { PhoneNumberSchema } from "../PhoneNumber";
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

describe("PhoneNumber", () => {
  test("type and format validation", async () => {
    const schema = new PhoneNumberSchema({});
    expectError(await schema.render({ ...options, fixValue: false, value: 0 }), {
      type: "InvalidType",
      details: { expectedType: "string" },
      message: "",
    });
    expectError(await schema.render({ ...options, value: "x" }), {
      type: "InvalidFormat",
      details: { expectedFormat: "phone-number" },
      message: "",
    });
    expectError(await schema.render({ ...options, value: "+362012345678" }), {
      type: "InvalidFormat",
      details: { expectedFormat: "phone-number" },
      message: "",
    });
    expectError(await schema.render({ ...options, value: "+36 20 1234 567 8" }), {
      type: "InvalidFormat",
      details: { expectedFormat: "phone-number" },
      message: "",
    });
    expectNoError(await schema.render({ ...options, value: 0 }));
    expectNoError(await schema.render({ ...options, value: "+36 20 1234 567" }));
  });

  test("optional field validation", async () => {
    const schema = new PhoneNumberSchema({});
    expectNoError(await schema.render({ ...options, value: undefined }));
    expectNoError(await schema.render({ ...options, value: "+36201234567" }));
  });

  test("required field validation", async () => {
    const schema = new PhoneNumberSchema({ required: true, errorMessages });
    expectError(await schema.render({ ...options, value: undefined }), {
      type: "Required",
      details: {},
      message: "this field is required",
    });
    expectNoError(await schema.render({ ...options, value: "+36201234567" }));
  });

  test("default value", async () => {
    const schema = new PhoneNumberSchema({
      required: true,
      defaultValue: "+36201234567",
      errorMessages,
    });
    expectError(await schema.render({ ...options, value: null }), {
      type: "Required",
      details: {},
      message: "this field is required",
    });
    expectNoError(await schema.render({ ...options, value: undefined }));
    expectNoError(await schema.render({ ...options, value: "+36201234567" }));
  });
});
