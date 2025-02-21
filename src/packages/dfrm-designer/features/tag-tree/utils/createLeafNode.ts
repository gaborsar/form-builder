import type { TagTreeNodeData } from "../../../model";
import { createId } from "../../../utils/id";
import type { Node } from "../../../utils/tree";

export function createLeafNode(): Node<TagTreeNodeData> {
  return {
    id: createId(),
    visible: true,
    collapsible: false,
    collapsed: false,
    data: {
      type: "Leaf",
      name: "",
      label: {},
      relations: [],
    },
    children: [],
  };
}
