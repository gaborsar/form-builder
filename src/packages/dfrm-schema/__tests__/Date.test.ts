import { DateSchema } from "../Date";
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

describe("Date", () => {
  test("type and format validation", async () => {
    const schema = new DateSchema({});
    expectError(await schema.render({ ...options, fixValue: false, value: 0 }), {
      type: "InvalidType",
      details: { expectedType: "string" },
      message: "",
    });
    expectError(await schema.render({ ...options, fixValue: false, value: "x" }), {
      type: "InvalidFormat",
      details: { expectedFormat: "date" },
      message: "",
    });
    expectNoError(await schema.render({ ...options, value: 0 }));
    expectNoError(await schema.render({ ...options, value: "x" }));
    expectNoError(await schema.render({ ...options, value: "2020-01-01" }));
  });

  test("optional field validation", async () => {
    const schema = new DateSchema({});
    expectNoError(await schema.render({ ...options, value: undefined }));
    expectNoError(await schema.render({ ...options, value: "2020-01-01" }));
  });

  test("required field validation", async () => {
    const schema = new DateSchema({ required: true, errorMessages });
    expectError(await schema.render({ ...options, value: undefined }), {
      type: "Required",
      details: {},
      message: "this field is required",
    });
    expectNoError(await schema.render({ ...options, value: "2020-01-01" }));
  });

  test("default value", async () => {
    const schema = new DateSchema({
      required: true,
      defaultValue: "2020-01-01",
      errorMessages,
    });
    expectError(await schema.render({ ...options, value: null }), {
      type: "Required",
      details: {},
      message: "this field is required",
    });
    expectNoError(await schema.render({ ...options, value: undefined }));
    expectNoError(await schema.render({ ...options, value: "2020-01-01" }));
  });
});
