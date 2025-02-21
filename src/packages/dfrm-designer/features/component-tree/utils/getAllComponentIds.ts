import type { ComponentTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";

export function getAllComponentIds(node: Node<ComponentTreeNodeData>): string[] {
  if (node.data.type === "Parent") {
    return [node.id].concat(node.children.flatMap(getAllComponentIds));
  }
  return [node.id];
}
