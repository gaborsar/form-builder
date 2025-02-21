import { isValidRelativePath } from "./isValidRelativePath";

test("isValidRelativePath", () => {
  expect(isValidRelativePath("../a")).toBe(true);
  expect(isValidRelativePath("")).toBe(false);
  expect(isValidRelativePath("/a")).toBe(false);
  expect(isValidRelativePath("../a//b")).toBe(false);
  expect(isValidRelativePath("..")).toBe(false);
  expect(isValidRelativePath("../b/")).toBe(false);
});
