import type { SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { hasOptions } from "./hasOptions";

export function getSelectableChildren(node: Node<SchemaTreeNodeData>): Node<SchemaTreeNodeData>[] {
  return hasOptions(node.data.type) ? node.children : [];
}
