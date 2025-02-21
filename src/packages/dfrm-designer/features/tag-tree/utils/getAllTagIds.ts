import type { TagTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";

export function getAllTagIds(node: Node<TagTreeNodeData>): string[] {
  if (node.data.type === "Parent") {
    return [node.id].concat(node.children.flatMap(getAllTagIds));
  }
  return [node.id];
}
