import type { SchemaTreeNodeData } from "../../../model";
import { createId } from "../../../utils/id";
import type { Node } from "../../../utils/tree";

export function createColumnNode(children: Node<SchemaTreeNodeData>[]): Node<SchemaTreeNodeData> {
  return {
    id: createId(),
    visible: true,
    collapsible: true,
    collapsed: false,
    data: {
      type: "Column",
      width: 12,
      grow: false,
    },
    children,
  };
}
