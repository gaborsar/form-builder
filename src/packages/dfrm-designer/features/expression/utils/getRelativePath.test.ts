import { getRelativePath } from "./getRelativePath";

test("getRelativePath", () => {
  expect(getRelativePath("/a/b//c/d", "/a/b//c/e")).toBe("e");
  expect(getRelativePath("/a/b//c/d", "/a/b//f")).toBe("../f");
  expect(getRelativePath("/a/b//c/d", "/a/g//h")).toBe("../../../g//h");
  expect(getRelativePath("/a/b//c/d", "/a/i/j")).toBe("../../../i/j");
  expect(getRelativePath("/a/b//c/d", "/a/k")).toBe("../../../k");
  expect(getRelativePath("/a/b//c/d", "/l")).toBe("../../../../l");
});
