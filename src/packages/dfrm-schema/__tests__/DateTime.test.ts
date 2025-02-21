import { DateTimeSchema } from "../DateTime";
import { expectError, expectNoError } from "../TestUtils";

const messages = {
  now: { en: "Now" },
};

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

describe("DateTime", () => {
  test("type and format validation", async () => {
    const schema = new DateTimeSchema({ messages });
    expectError(await schema.render({ ...options, fixValue: false, value: 0 }), {
      type: "InvalidType",
      details: { expectedType: "string" },
      message: "",
    });
    expectError(await schema.render({ ...options, fixValue: false, value: "x" }), {
      type: "InvalidFormat",
      details: { expectedFormat: "date-time" },
      message: "",
    });
    expectNoError(await schema.render({ ...options, value: 0 }));
    expectNoError(await schema.render({ ...options, value: "x" }));
    expectNoError(await schema.render({ ...options, value: "2020-01-01 12:50" }));
    expectNoError(await schema.render({ ...options, value: "2020-01-01 12:50:30" }));
    expectNoError(
      await schema.render({
        ...options,
        value: "2020-01-01T12:50:30.000Z",
      }),
    );
  });

  test("optional field validation", async () => {
    const schema = new DateTimeSchema({ messages });
    expectNoError(await schema.render({ ...options, value: undefined }));
    expectNoError(await schema.render({ ...options, value: "2020-01-01 12:50" }));
  });

  test("required field validation", async () => {
    const schema = new DateTimeSchema({
      required: true,
      messages,
      errorMessages,
    });
    expectError(await schema.render({ ...options, value: undefined }), {
      type: "Required",
      details: {},
      message: "this field is required",
    });
    expectNoError(await schema.render({ ...options, value: "2020-01-01 12:50" }));
  });

  test("default value", async () => {
    const schema = new DateTimeSchema({
      required: true,
      defaultValue: "2020-01-01 12:50",
      messages,
      errorMessages,
    });
    expectError(await schema.render({ ...options, value: null }), {
      type: "Required",
      details: {},
      message: "this field is required",
    });
    expectNoError(await schema.render({ ...options, value: undefined }));
    expectNoError(await schema.render({ ...options, value: "2020-01-01 12:50" }));
  });
});
