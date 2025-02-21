import type { SchemaTreeNodeData } from "../../../model";
import { createId } from "../../../utils/id";
import type { Node } from "../../../utils/tree";

export function createObjectNode(): Node<SchemaTreeNodeData> {
  return {
    id: createId(),
    visible: true,
    collapsible: true,
    collapsed: false,
    data: {
      type: "Object",
      key: "",
    },
    children: [],
  };
}
