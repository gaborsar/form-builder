import type { TagTreeNodeData } from "../../../model";
import { createId } from "../../../utils/id";
import type { Node } from "../../../utils/tree";

export function createParentNode(): Node<TagTreeNodeData> {
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
