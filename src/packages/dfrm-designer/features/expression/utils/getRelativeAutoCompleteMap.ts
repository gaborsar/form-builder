import type { AutoCompleteMap } from "../state/types";
import { getRelativePath } from "./getRelativePath";
import { isValidRelativePath } from "./isValidRelativePath";

export function getRelativeAutoCompleteMap(map: AutoCompleteMap, path: string): AutoCompleteMap {
  const relativePathMap: { [key: string]: string } = {};
  for (const currentPath of map.paths) {
    relativePathMap[currentPath] = getRelativePath(path, currentPath);
  }
  const paths: string[] = map.paths
    .map((currentPath) => getRelativePath(path, currentPath))
    .filter(isValidRelativePath);
  const enums: { [key: string]: string[] } = {};
  for (const [enumPath, values] of Object.entries(map.enums)) {
    const relativePath = getRelativePath(path, enumPath);
    if (isValidRelativePath(relativePath)) {
      enums[relativePath] = values;
    }
  }
  return { paths, enums };
}
