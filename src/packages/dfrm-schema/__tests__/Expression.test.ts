import { ExpressionSchema } from "../Expression";

describe("Expression", () => {
  test("ISTEXT", async () => {
    const schema = new ExpressionSchema({ template: "ISTEXT({a})" });
    expect(await schema.evaluate({ root: { a: "" }, path: [] })).toBe(true);
    expect(await schema.evaluate({ root: { a: 0 }, path: [] })).toBe(false);
  });

  test("ISNUMBER", async () => {
    const schema = new ExpressionSchema({ template: "ISNUMBER({a})" });
    expect(await schema.evaluate({ root: { a: 0 }, path: [] })).toBe(true);
    expect(await schema.evaluate({ root: { a: "" }, path: [] })).toBe(false);
  });

  test("ISLOGICAL", async () => {
    const schema = new ExpressionSchema({ template: "ISLOGICAL({a})" });
    expect(await schema.evaluate({ root: { a: true }, path: [] })).toBe(true);
    expect(await schema.evaluate({ root: { a: 0 }, path: [] })).toBe(false);
  });

  test("ISOBJECT", async () => {
    const schema = new ExpressionSchema({ template: "ISOBJECT({a})" });
    expect(await schema.evaluate({ root: { a: {} }, path: [] })).toBe(true);
    expect(await schema.evaluate({ root: { a: 0 }, path: [] })).toBe(false);
    expect(await schema.evaluate({ root: { a: [] }, path: [] })).toBe(false);
    expect(await schema.evaluate({ root: { a: null }, path: [] })).toBe(false);
  });

  test("ISLIST", async () => {
    const schema = new ExpressionSchema({ template: "ISLIST({a})" });
    expect(await schema.evaluate({ root: { a: [] }, path: [] })).toBe(true);
    expect(await schema.evaluate({ root: { a: 0 }, path: [] })).toBe(false);
  });

  test("LENGTH", async () => {
    const schema = new ExpressionSchema({ template: "LENGTH({a})" });
    expect(await schema.evaluate({ root: { a: [1, 2, 3] }, path: [] })).toBe(3);
    expect(await schema.evaluate({ root: { a: "abc" }, path: [] })).toBe(3);
  });

  test("IF", async () => {
    const schema1 = new ExpressionSchema({ template: "IF({a}, 1, 2)" });
    expect(await schema1.evaluate({ root: { a: true }, path: [] })).toBe(1);
    expect(await schema1.evaluate({ root: { a: false }, path: [] })).toBe(2);
    const schema2 = new ExpressionSchema({ template: "IF({a}, 1)" });
    expect(await schema2.evaluate({ root: { a: true }, path: [] })).toBe(1);
    expect(await schema2.evaluate({ root: { a: false }, path: [] })).toBe(undefined);
  });

  test("AND", async () => {
    const schema = new ExpressionSchema({
      template: "AND({a}, {b}, {c})",
    });
    expect(
      await schema.evaluate({
        root: { a: true, b: true, c: true },
        path: [],
      }),
    ).toBe(true);
    expect(
      await schema.evaluate({
        root: { a: true, b: true, c: false },
        path: [],
      }),
    ).toBe(false);
  });

  test("OR", async () => {
    const schema = new ExpressionSchema({
      template: "OR({a}, {b}, {c})",
    });
    expect(
      await schema.evaluate({
        root: { a: true, b: false, c: false },
        path: [],
      }),
    ).toBe(true);
    expect(
      await schema.evaluate({
        root: { a: false, b: false, c: false },
        path: [],
      }),
    ).toBe(false);
  });

  test("NOT", async () => {
    const schema = new ExpressionSchema({ template: "NOT({a})" });
    expect(await schema.evaluate({ root: { a: true }, path: [] })).toBe(false);
    expect(await schema.evaluate({ root: { a: false }, path: [] })).toBe(true);
  });

  test("EQ", async () => {
    const schema = new ExpressionSchema({ template: "EQ({a}, 1)" });
    expect(await schema.evaluate({ root: { a: 1 }, path: [] })).toBe(true);
    expect(await schema.evaluate({ root: { a: 2 }, path: [] })).toBe(false);
  });

  test("INCLUDES", async () => {
    const schema = new ExpressionSchema({
      template: "INCLUDES({a}, 1)",
    });
    expect(await schema.evaluate({ root: { a: [1] }, path: [] })).toBe(true);
    expect(await schema.evaluate({ root: { a: [2] }, path: [] })).toBe(false);
  });

  test("LT", async () => {
    const schema = new ExpressionSchema({ template: "LT({a}, 3)" });
    expect(await schema.evaluate({ root: { a: 2 }, path: [] })).toBe(true);
    expect(await schema.evaluate({ root: { a: 3 }, path: [] })).toBe(false);
  });

  test("GT", async () => {
    const schema = new ExpressionSchema({ template: "GT({a}, 3)" });
    expect(await schema.evaluate({ root: { a: 4 }, path: [] })).toBe(true);
    expect(await schema.evaluate({ root: { a: 3 }, path: [] })).toBe(false);
  });

  test("LTE", async () => {
    const schema = new ExpressionSchema({ template: "LTE({a}, 3)" });
    expect(await schema.evaluate({ root: { a: 2 }, path: [] })).toBe(true);
    expect(await schema.evaluate({ root: { a: 3 }, path: [] })).toBe(true);
    expect(await schema.evaluate({ root: { a: 4 }, path: [] })).toBe(false);
  });

  test("GTE", async () => {
    const schema = new ExpressionSchema({ template: "GTE({a}, 3)" });
    expect(await schema.evaluate({ root: { a: 4 }, path: [] })).toBe(true);
    expect(await schema.evaluate({ root: { a: 3 }, path: [] })).toBe(true);
    expect(await schema.evaluate({ root: { a: 2 }, path: [] })).toBe(false);
  });

  test("ROUND", async () => {
    const schema1 = new ExpressionSchema({ template: "ROUND({a})" });
    expect(await schema1.evaluate({ root: { a: 1.1 }, path: [] })).toBe(1);
    const schema2 = new ExpressionSchema({ template: "ROUND({a}, 2)" });
    expect(await schema2.evaluate({ root: { a: 1.245 }, path: [] })).toBe(1.25);
  });

  test("FLOOR", async () => {
    const schema = new ExpressionSchema({ template: "FLOOR({a})" });
    expect(await schema.evaluate({ root: { a: 1.1 }, path: [] })).toBe(1);
  });

  test("CEILING", async () => {
    const schema = new ExpressionSchema({ template: "CEILING({a})" });
    expect(await schema.evaluate({ root: { a: 1.1 }, path: [] })).toBe(2);
  });

  test("MOD", async () => {
    const schema = new ExpressionSchema({ template: "MOD({a}, 3)" });
    expect(await schema.evaluate({ root: { a: 5 }, path: [] })).toBe(2);
  });

  test("POWER", async () => {
    const schema = new ExpressionSchema({ template: "POWER({a}, 2)" });
    expect(await schema.evaluate({ root: { a: 2 }, path: [] })).toBe(4);
  });

  test("SQRT", async () => {
    const schema = new ExpressionSchema({ template: "SQRT({a})" });
    expect(await schema.evaluate({ root: { a: 4 }, path: [] })).toBe(2);
  });
});
