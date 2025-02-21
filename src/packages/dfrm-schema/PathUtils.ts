import { isArray, isObject, isString } from "./TypeUtils";

export type Path = (string | number)[];

export function resolvePath(pathA: Path, pathB: Path): Path {
  const pathC = pathA.slice();
  for (const key of pathB) {
    if (key === "..") {
      if (pathC.length === 0) {
        throw new Error("invalid relative path");
      }
      pathC.pop();
    } else {
      pathC.push(key);
    }
  }
  return pathC;
}

export function findValueByPath(value: unknown, path: Path): unknown {
  let result = value;
  for (const key of path) {
    if (isString(key)) {
      if (isObject(result)) {
        result = result[key];
      } else {
        return undefined;
      }
    } else {
      if (isArray(result)) {
        result = result[key];
      } else {
        return undefined;
      }
    }
  }
  return result;
}
