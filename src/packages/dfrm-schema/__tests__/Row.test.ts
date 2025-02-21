import { ColumnSchema } from "../Column";
import { isEmptyResult } from "../Empty";
import { FieldSchema } from "../Field";
import { RowSchema } from "../Row";
import { ShortTextSchema } from "../ShortText";

const field = new FieldSchema({
  key: "",
  label: {},
  child: new ShortTextSchema({}),
});

const options = {
  locale: "en",
  root: {},
  path: [],
  namePrefix: "",
};

describe("Row", () => {
  test("grow one column", async () => {
    const schema = new RowSchema({
      children: [
        new ColumnSchema({ width: 3, child: field }),
        new ColumnSchema({ width: 3, grow: true, child: field }),
      ],
    });
    const result = await schema.render({ ...options, value: {} });
    if (isEmptyResult(result) || result.children === undefined) {
      throw new Error();
    }
    expect(result.children[0].width).toBe(3);
    expect(result.children[1].width).toBe(9);
  });

  test("grow columns equally", async () => {
    const schema = new RowSchema({
      children: [
        new ColumnSchema({ width: 2, grow: true, child: field }),
        new ColumnSchema({ width: 4, grow: true, child: field }),
      ],
    });
    const result = await schema.render({ ...options, value: {} });
    if (isEmptyResult(result) || result.children === undefined) {
      throw new Error();
    }
    expect(result.children[0].width).toBe(5);
    expect(result.children[1].width).toBe(7);
  });

  test("grow columns equally and fill remaining space", async () => {
    const schema = new RowSchema({
      children: [
        new ColumnSchema({ width: 2, child: field }),
        new ColumnSchema({ width: 2, grow: true, child: field }),
        new ColumnSchema({ width: 3, grow: true, child: field }),
      ],
    });
    const result = await schema.render({ ...options, value: {} });
    if (isEmptyResult(result) || result.children === undefined) {
      throw new Error();
    }
    expect(result.children[0].width).toBe(2);
    expect(result.children[1].width).toBe(5);
    expect(result.children[2].width).toBe(5);
  });
});
