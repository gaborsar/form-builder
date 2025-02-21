import { DropdownSchema } from "../Dropdown";
import { expectError, expectNoError, expectValue } from "../TestUtils";

const messages = {
  select: { en: "Select" },
  search: { en: "Search" },
  noOptions: { en: "No options" },
};

const errorMessages = {
  Required: { en: "this field is required" },
};

const options = {
  locale: "en",
  root: {},
  path: [],
  namePrefix: "",
};

describe("Dropdown", () => {
  test("type validation", async () => {
    const schema = new DropdownSchema({
      options: [{ label: {}, value: "a" }],
      messages,
    });
    expectError(await schema.render({ ...options, fixValue: false, value: 0 }), {
      type: "InvalidType",
      details: { expectedType: "string" },
      message: "",
    });
    expectNoError(await schema.render({ ...options, value: 0 }));
    expectNoError(await schema.render({ ...options, value: 0 }));
    expectNoError(await schema.render({ ...options, value: "a" }));
  });

  test("value validation", async () => {
    const schema = new DropdownSchema({
      options: [{ label: {}, value: "a" }],
      messages,
    });
    expectError(await schema.render({ ...options, fixValue: false, value: "b" }), {
      type: "InvalidValue",
      details: { values: ["a"] },
      message: "",
    });
    expectValue(await schema.render({ ...options, value: "b" }), null);
    expectNoError(await schema.render({ ...options, value: "a" }));
  });

  test("optional field validation", async () => {
    const schema = new DropdownSchema({
      options: [{ label: {}, value: "a" }],
      messages,
    });
    expectNoError(await schema.render({ ...options, value: undefined }));
    expectNoError(await schema.render({ ...options, value: "a" }));
  });

  test("required field validation", async () => {
    const schema = new DropdownSchema({
      options: [{ label: {}, value: "a" }],
      required: true,
      messages,
      errorMessages,
    });
    expectError(await schema.render({ ...options, value: undefined }), {
      type: "Required",
      details: {},
      message: "this field is required",
    });
    expectNoError(await schema.render({ ...options, value: "a" }));
  });

  test("default value", async () => {
    const schema = new DropdownSchema({
      options: [{ label: {}, value: "a" }],
      required: true,
      defaultValue: "a",
      messages,
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
