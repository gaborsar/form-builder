import type { ComponentTreeNodeData } from "../../../model";
import { createId } from "../../../utils/id";
import type { Node } from "../../../utils/tree";

export function createParentNode(): Node<ComponentTreeNodeData> {
  return {
    id: createId(),
    visible: true,
    collapsible: true,
    collapsed: false,
    data: {
      type: "Parent",
      name: "",
      label: {},
    },
    children: [],
  };
}
