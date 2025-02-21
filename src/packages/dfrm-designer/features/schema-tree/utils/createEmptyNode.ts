import type { SchemaTreeNodeData } from "../../../model";
import { createId } from "../../../utils/id";
import type { Node } from "../../../utils/tree";

export function createEmptyNode(): Node<SchemaTreeNodeData> {
  return {
    id: createId(),
    visible: true,
    collapsible: false,
    collapsed: false,
    data: {
      type: "Empty",
    },
    children: [],
  };
}
