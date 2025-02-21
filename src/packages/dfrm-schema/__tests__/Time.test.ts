import { expectError, expectNoError } from "../TestUtils";
import { TimeSchema } from "../Time";

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

describe("Time", () => {
  test("type and format validation", async () => {
    const schema = new TimeSchema({});
    expectError(await schema.render({ ...options, fixValue: false, value: 0 }), {
      type: "InvalidType",
      details: { expectedType: "string" },
      message: "",
    });
    expectError(await schema.render({ ...options, fixValue: false, value: "x" }), {
      type: "InvalidFormat",
      details: { expectedFormat: "time" },
      message: "",
    });
    expectNoError(await schema.render({ ...options, value: 0 }));
    expectNoError(await schema.render({ ...options, value: "x" }));
    expectNoError(await schema.render({ ...options, value: "12:50" }));
    expectNoError(await schema.render({ ...options, value: "12:50:30" }));
  });

  test("optional field validation", async () => {
    const schema = new TimeSchema({});
    expectNoError(await schema.render({ ...options, value: null }));
    expectNoError(await schema.render({ ...options, value: "12:50" }));
  });

  test("required field validation", async () => {
    const schema = new TimeSchema({ required: true, errorMessages });
    expectError(await schema.render({ ...options, value: null }), {
      type: "Required",
      details: {},
      message: "this field is required",
    });
    expectNoError(await schema.render({ ...options, value: "12:50" }));
  });

  test("default values", async () => {
    const schema = new TimeSchema({
      required: true,
      defaultValue: "12:50",
      errorMessages,
    });
    expectError(await schema.render({ ...options, value: null }), {
      type: "Required",
      details: {},
      message: "this field is required",
    });
    expectNoError(await schema.render({ ...options, value: undefined }));
    expectNoError(await schema.render({ ...options, value: "12:50" }));
  });
});
