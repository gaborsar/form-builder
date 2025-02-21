import type { SchemaTreeNodeData, SchemaTreeOptionNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { TagMap } from "../../inspector";
import { getSingleChoiceDefaultValue } from "./getSingleChoiceDefaultValue";

export function getMultiChoiceDefaultValue(
  tagMap: TagMap,
  nodes: Node<SchemaTreeOptionNodeData, SchemaTreeNodeData>[],
  ids: string[],
): string[] {
  return ids.map((id) => getSingleChoiceDefaultValue(tagMap, nodes, id));
}
