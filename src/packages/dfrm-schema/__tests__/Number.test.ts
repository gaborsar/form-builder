import { NumberSchema } from "../Number";
import { expectError, expectNoError } from "../TestUtils";

const errorMessages = {
  Required: { en: "this field is required" },
  Precision: { en: "the max number of decimal places is {precision}" },
  MultipleOf: { en: "must be a multiple of {multipleOf}" },
  Min: { en: "the min is {min}" },
  Max: { en: "the max is {max}" },
  MinExclusive: { en: "the min is <{minExclusive}" },
  MaxExclusive: { en: "the max is >{maxExclusive}" },
};

const options = {
  locale: "en",
  root: {},
  path: [],
  namePrefix: "",
};

describe("Number", () => {
  test("type validation", async () => {
    const schema = new NumberSchema({});
    expectError(await schema.render({ ...options, fixValue: false, value: "" }), {
      type: "InvalidType",
      details: { expectedType: "number" },
      message: "",
    });
    expectNoError(await schema.render({ ...options, value: "" }));
    expectNoError(await schema.render({ ...options, value: 0 }));
  });

  test("optional field validation", async () => {
    const schema = new NumberSchema({});
    expectNoError(await schema.render({ ...options, value: undefined }));
    expectNoError(await schema.render({ ...options, value: 0 }));
  });

  test("required field validation", async () => {
    const schema = new NumberSchema({ required: true, errorMessages });
    expectError(await schema.render({ ...options, value: undefined }), {
      type: "Required",
      details: {},
      message: "this field is required",
    });
    expectNoError(await schema.render({ ...options, value: 0 }));
  });

  test("default value", async () => {
    const schema = new NumberSchema({
      required: true,
      defaultValue: 0,
      errorMessages,
    });
    expectError(await schema.render({ ...options, value: null }), {
      type: "Required",
      details: {},
      message: "this field is required",
    });
    expectNoError(await schema.render({ ...options, value: undefined }));
    expectNoError(await schema.render({ ...options, value: 0 }));
  });

  test("precision validation", async () => {
    const schema = new NumberSchema({ precision: 2, errorMessages });
    expectError(await schema.render({ ...options, value: 1.111 }), {
      type: "Precision",
      details: { precision: 2 },
      message: "the max number of decimal places is 2",
    });
    expectNoError(await schema.render({ ...options, value: 1 }));
    expectNoError(await schema.render({ ...options, value: 1e21 }));
    expectNoError(await schema.render({ ...options, value: 1.1 }));
    expectNoError(await schema.render({ ...options, value: 1.11 }));
  });

  test("multiple of validation", async () => {
    const schema = new NumberSchema({ multipleOf: 5, errorMessages });
    expectError(await schema.render({ ...options, value: 11 }), {
      type: "MultipleOf",
      details: { multipleOf: 5 },
      message: "must be a multiple of 5",
    });
    expectNoError(await schema.render({ ...options, value: 5 }));
    expectNoError(await schema.render({ ...options, value: 10 }));
  });

  test("min validation", async () => {
    const schema = new NumberSchema({ min: 10, errorMessages });
    expectError(await schema.render({ ...options, value: 9 }), {
      type: "Min",
      details: { min: 10 },
      message: "the min is 10",
    });
    expectNoError(await schema.render({ ...options, value: 11 }));
    expectNoError(await schema.render({ ...options, value: 10 }));
  });

  test("max validation", async () => {
    const schema = new NumberSchema({ max: 10, errorMessages });
    expectError(await schema.render({ ...options, value: 11 }), {
      type: "Max",
      details: { max: 10 },
      message: "the max is 10",
    });
    expectNoError(await schema.render({ ...options, value: 9 }));
    expectNoError(await schema.render({ ...options, value: 10 }));
  });

  test("min exclusive validation", async () => {
    const schema = new NumberSchema({ minExclusive: 10, errorMessages });
    expectError(await schema.render({ ...options, value: 10 }), {
      type: "MinExclusive",
      details: { minExclusive: 10 },
      message: "the min is <10",
    });
    expectError(await schema.render({ ...options, value: 9 }), {
      type: "MinExclusive",
      details: { minExclusive: 10 },
      message: "the min is <10",
    });
    expectNoError(await schema.render({ ...options, value: 11 }));
  });

  test("max exclusive validation", async () => {
    const schema = new NumberSchema({ maxExclusive: 10, errorMessages });
    expectError(await schema.render({ ...options, value: 10 }), {
      type: "MaxExclusive",
      details: { maxExclusive: 10 },
      message: "the max is >10",
    });
    expectError(await schema.render({ ...options, value: 11 }), {
      type: "MaxExclusive",
      details: { maxExclusive: 10 },
      message: "the max is >10",
    });
    expectNoError(await schema.render({ ...options, value: 9 }));
  });
});
