import { getRelativeAutoCompleteMap } from "./getRelativeAutoCompleteMap";

test("getRelativeAutoCompleteMap", () => {
  const map = {
    paths: ["/a", "/b", "/b//c", "/b//d"],
    enums: {
      "/a": ["1", "2", "3"],
      "/b//c": ["4", "5", "6"],
    },
  };
  expect(getRelativeAutoCompleteMap(map, "/a")).toEqual({
    paths: ["b"],
    enums: {},
  });
  expect(getRelativeAutoCompleteMap(map, "/b")).toEqual({
    paths: ["a"],
    enums: {
      a: ["1", "2", "3"],
    },
  });
  expect(getRelativeAutoCompleteMap(map, "/b//c")).toEqual({
    paths: ["../../a", "d"],
    enums: {
      "../../a": ["1", "2", "3"],
    },
  });
  expect(getRelativeAutoCompleteMap(map, "/b//d")).toEqual({
    paths: ["../../a", "c"],
    enums: {
      "../../a": ["1", "2", "3"],
      c: ["4", "5", "6"],
    },
  });
});
