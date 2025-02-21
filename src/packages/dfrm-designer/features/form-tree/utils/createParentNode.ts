import type { FormTreeNodeData } from "../../../model";
import { createId } from "../../../utils/id";
import type { Node } from "../../../utils/tree";

export function createParentNode(): Node<FormTreeNodeData> {
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
