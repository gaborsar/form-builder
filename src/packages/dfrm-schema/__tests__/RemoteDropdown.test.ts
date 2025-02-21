import type { Option } from "../Option";
import { RemoteDropdownSchema } from "../RemoteDropdown";
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
  fetchRemoteOptions(): Promise<Option<unknown>[]> {
    return Promise.resolve([{ label: {}, value: "a" }]);
  },
};

describe("RemoteDropdown", () => {
  test("type validation", async () => {
    const schema = new RemoteDropdownSchema({ path: "", messages });
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
    const schema = new RemoteDropdownSchema({ path: "", messages });
    expectError(await schema.render({ ...options, fixValue: false, value: "b" }), {
      type: "InvalidValue",
      details: { values: ["a"] },
      message: "",
    });
    expectValue(await schema.render({ ...options, value: "b" }), null);
    expectNoError(await schema.render({ ...options, value: "a" }));
  });

  test("optional field validation", async () => {
    const schema = new RemoteDropdownSchema({ path: "", messages });
    expectNoError(await schema.render({ ...options, value: undefined }));
    expectNoError(await schema.render({ ...options, value: "a" }));
  });

  test("required field validation", async () => {
    const schema = new RemoteDropdownSchema({
      path: "",
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
});
