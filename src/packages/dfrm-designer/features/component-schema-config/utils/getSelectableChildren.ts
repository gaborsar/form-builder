import type { ComponentSchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { hasOptions } from "./hasOptions";

export function getSelectableChildren(
  node: Node<ComponentSchemaTreeNodeData>,
): Node<ComponentSchemaTreeNodeData>[] {
  return hasOptions(node.data.type) ? node.children : [];
}
