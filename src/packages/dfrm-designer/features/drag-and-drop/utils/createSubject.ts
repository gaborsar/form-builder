import { type Node, resolvePath } from "../../../utils/tree";
import type { DndSubject } from "../state/types";

export function createSubject<Data>(root: Node<Data>, path: string[]): DndSubject<Data> {
  const nodes = resolvePath(root, path);

  const ancestors = nodes.slice(0, -1) as Node<Data>[];
  const node = nodes[nodes.length - 1];

  let index = -1;
  if (ancestors.length !== 0) {
    index = ancestors[ancestors.length - 1].children.indexOf(node);
  }

  return { path, ancestors, node, index };
}
