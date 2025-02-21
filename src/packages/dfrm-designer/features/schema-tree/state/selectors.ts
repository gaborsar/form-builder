import type { SchemaTreeNodeData } from "../../../model";
import { type Node, resolvePath } from "../../../utils/tree";

export function findFirstNoneConditionalParent(
  root: Node<SchemaTreeNodeData>,
  path: string[],
): Node<SchemaTreeNodeData> {
  const nodes = resolvePath(root, path.slice(0, -1));
  let out: Node<SchemaTreeNodeData> | null = null;
  for (const node of nodes) {
    if (node.data.type !== "Conditional") {
      out = node;
    }
  }
  if (out === null) {
    throw new Error();
  }
  return out;
}
