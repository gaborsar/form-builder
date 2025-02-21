import { ObjectSchema } from "../Object";
import { expectError, expectNoError } from "../TestUtils";

const options = {
  locale: "en",
  root: {},
  path: [],
  namePrefix: "",
};

describe("Object", () => {
  test("type validation", async () => {
    const form = new ObjectSchema({ key: "a", children: [] });
    expectError(await form.render({ ...options, fixValue: false, value: {} }), {
      type: "InvalidType",
      details: { expectedType: "object" },
      message: "",
    });
    expectNoError(await form.render({ ...options, value: {} }));
    expectNoError(await form.render({ ...options, value: { a: {} } }));
  });

  test("unknown key validation", async () => {
    const form = new ObjectSchema({ key: "a", children: [] });
    expectError(
      await form.render({
        ...options,
        fixValue: false,
        value: { a: { b: "" } },
      }),
      {
        type: "UnknownKey",
        details: { key: "b" },
        message: "",
      },
    );
    expectNoError(await form.render({ ...options, value: { a: { b: "" } } }));
  });
});
