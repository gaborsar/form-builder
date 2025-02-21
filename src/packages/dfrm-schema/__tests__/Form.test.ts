import { ColumnSchema } from "../Column";
import { ComputedSchema } from "../Computed";
import { FieldSchema } from "../Field";
import { FieldsetSchema } from "../Fieldset";
import { FormSchema } from "../Form";
import { NumberSchema } from "../Number";
import { RowSchema } from "../Row";
import { ShortTextSchema } from "../ShortText";

const options = {
  locale: "en",
  root: {},
  path: [],
  namePrefix: "",
};

describe("From", () => {
  test("type validation", async () => {
    const form = new FormSchema({ children: [] });
    expect(await form.render({ ...options, fixValue: false, value: 0 })).toMatchSnapshot();
    expect(await form.render({ ...options, value: 0 })).toMatchSnapshot();
    expect(await form.render({ ...options, value: {} })).toMatchSnapshot();
  });

  test("unknown key validation", async () => {
    const form = new FormSchema({ children: [] });
    expect(await form.render({ ...options, fixValue: false, value: { a: "" } })).toMatchSnapshot();
    expect(await form.render({ ...options, value: { a: "" } })).toMatchSnapshot();
    expect(await form.render({ ...options, value: {} })).toMatchSnapshot();
  });

  test("rendering children", async () => {
    const col = new ColumnSchema<void>({
      width: 12,
      child: new FieldSchema<void>({
        key: "a",
        label: {},
        child: new ShortTextSchema<undefined>({}),
      }),
    });
    const row = new RowSchema<void>({ children: [col] });
    const fieldset = new FieldsetSchema<void>({
      label: {},
      children: [row],
    });
    const form = new FormSchema<void>({ children: [fieldset] });
    expect(await form.render({ ...options, value: { a: "" } })).toMatchSnapshot();
  });

  test("passing down error messages", async () => {
    const colA = new ColumnSchema({
      width: 6,
      child: new FieldSchema({
        key: "a",
        label: {},
        child: new ShortTextSchema<undefined>({
          required: true,
          errorMessages: { Required: { en: "a is required" } },
        }),
      }),
    });
    const colB = new ColumnSchema({
      width: 6,
      child: new FieldSchema({
        key: "b",
        label: {},
        child: new ShortTextSchema<undefined>({ required: true }),
      }),
    });
    const row = new RowSchema({ children: [colA, colB] });
    const fieldset = new FieldsetSchema({ label: {}, children: [row] });
    const form = new FormSchema({
      errorMessages: { Required: { en: "this field is required" } },
      children: [fieldset],
    });
    expect(await form.render({ ...options, value: { a: undefined, b: "x" } })).toMatchSnapshot();
    expect(await form.render({ ...options, value: { a: "x", b: undefined } })).toMatchSnapshot();
  });

  test("updating values", async () => {
    const colA = new ColumnSchema({
      width: 4,
      child: new FieldSchema({
        key: "a",
        label: {},
        child: new NumberSchema<undefined>({}),
      }),
    });
    const colB = new ColumnSchema({
      width: 4,
      child: new FieldSchema({
        key: "b",
        label: {},
        child: new NumberSchema({}),
      }),
    });
    const colC = new ColumnSchema({
      width: 4,
      child: new FieldSchema({
        key: "c",
        label: {},
        child: new ComputedSchema({ template: "{a}+{b}" }),
      }),
    });
    const row = new RowSchema({ children: [colA, colB, colC] });
    const fieldset = new FieldsetSchema({ label: {}, children: [row] });
    const form = new FormSchema({
      errorMessages: { Required: { en: "this field is required" } },
      children: [fieldset],
    });
    expect(await form.render({ ...options, value: { a: 1, b: 2 } })).toMatchSnapshot();
  });
});
