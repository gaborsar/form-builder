import type { SchemaTreeNodeData, SchemaTreeOptionNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { TagMap } from "../../inspector";
import { getOptionValue } from "./convertOptionNode";

export function getSingleChoiceDefaultValue(
  tagMap: TagMap,
  nodes: Node<SchemaTreeOptionNodeData, SchemaTreeNodeData>[],
  id: string,
): string {
  const node = nodes.find((child) => child.id === id);
  if (node === undefined) {
    throw new Error();
  }
  return getOptionValue(tagMap, node);
}
