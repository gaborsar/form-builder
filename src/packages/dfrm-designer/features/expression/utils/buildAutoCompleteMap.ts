import type { SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { TagMap } from "../../inspector";
import type { AutoCompleteMap } from "../state/types";

interface BuildAutoCompleteMapJob {
  path: string;
  node: Node<SchemaTreeNodeData>;
  next: BuildAutoCompleteMapJob | null;
}

export function buildAutoCompleteMap(
  tagMap: TagMap,
  node: Node<SchemaTreeNodeData>,
): AutoCompleteMap {
  const paths = new Set<string>();
  const enums = new Map<string, string[]>();
  let first: BuildAutoCompleteMapJob | null = {
    path: "/",
    node,
    next: null,
  };
  let last = first;
  while (first !== null) {
    const { path: parentPath, node } = first;
    if ("key" in node.data) {
      let path = parentPath;
      if (path !== "/") {
        path += "/";
      }
      path += node.data.key;
      paths.add(path);
      if (node.data.type === "FieldGroupList" || node.data.type === "FieldList") {
        path += "/";
      }
      for (const child of node.children) {
        last.next = { path, node: child, next: null };
        last = last.next;
      }
    } else {
      if (
        node.data.type === "Dropdown" ||
        node.data.type === "ButtonGroup" ||
        node.data.type === "RadioGroup" ||
        node.data.type === "Slider" ||
        node.data.type === "MultiSelect" ||
        node.data.type === "CheckboxGroup" ||
        node.data.type === "SwitchGroup"
      ) {
        let values: string[] | undefined;
        if (enums.has(parentPath)) {
          values = enums.get(parentPath);
        }
        if (values === undefined) {
          values = [];
          enums.set(parentPath, values);
        }
        for (let i = 0, l = node.children.length; i < l; i++) {
          const child: Node<SchemaTreeNodeData> = node.children[i];
          if (child.data.type === "Option") {
            if (child.data.value !== "") {
              values.push(child.data.value);
            } else if (child.data.id !== undefined && child.data.id in tagMap) {
              const { leaf } = tagMap[child.data.id];
              values.push(leaf.data.name);
            }
          }
        }
      }
      for (const child of node.children) {
        last.next = { path: parentPath, node: child, next: null };
        last = last.next;
      }
    }
    first = first.next;
  }
  return {
    paths: Array.from(paths.values()),
    enums: Object.fromEntries(enums.entries()),
  };
}
