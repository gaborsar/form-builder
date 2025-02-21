import { SliderSchema } from "../Slider";
import { expectError, expectNoError, expectValue } from "../TestUtils";

const errorMessages = {
  Required: { en: "this field is required" },
};

const options = {
  locale: "en",
  root: {},
  path: [],
  namePrefix: "",
};

describe("Slider", () => {
  test("type validation", async () => {
    const schema = new SliderSchema({
      options: [{ label: {}, value: "a" }],
    });
    expectError(await schema.render({ ...options, fixValue: false, value: 0 }), {
      type: "InvalidType",
      details: { expectedType: "string" },
      message: "",
    });
    expectNoError(await schema.render({ ...options, value: 0 }));
    expectNoError(await schema.render({ ...options, value: "a" }));
  });

  test("value validation", async () => {
    const schema = new SliderSchema({
      options: [{ label: {}, value: "a" }],
    });
    expectError(await schema.render({ ...options, fixValue: false, value: "b" }), {
      type: "InvalidValue",
      details: { values: ["a"] },
      message: "",
    });
    expectValue(await schema.render({ ...options, value: "b" }), "a");
    expectNoError(await schema.render({ ...options, value: "a" }));
  });

  test("optional field validation", async () => {
    const schema = new SliderSchema({
      options: [{ label: {}, value: "a" }],
    });
    expectNoError(await schema.render({ ...options, value: undefined }));
    expectNoError(await schema.render({ ...options, value: "a" }));
  });

  test("required field validation", async () => {
    const schema = new SliderSchema({
      options: [],
      required: true,
      errorMessages,
    });
    expectError(await schema.render({ ...options, value: undefined }), {
      type: "Required",
      details: {},
      message: "this field is required",
    });
  });

  test("default value", async () => {
    const schema = new SliderSchema({
      options: [{ label: {}, value: "a" }],
      required: true,
      defaultValue: "a",
      errorMessages,
    });
    expectError(await schema.render({ ...options, value: null }), {
      type: "Required",
      details: {},
      message: "this field is required",
    });
    expectNoError(await schema.render({ ...options, value: undefined }));
  });

  test("first value as default value", async () => {
    const schema = new SliderSchema({
      options: [{ label: {}, value: "a" }],
      required: true,
      errorMessages,
    });
    expectError(await schema.render({ ...options, value: null }), {
      type: "Required",
      details: {},
      message: "this field is required",
    });
    expectNoError(await schema.render({ ...options, value: undefined }));
    expectNoError(await schema.render({ ...options, value: "a" }));
  });
});
