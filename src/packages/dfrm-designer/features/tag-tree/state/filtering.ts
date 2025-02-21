import type { TagTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";

export function filterRoot(
  root: Node<TagTreeNodeData>,
  locale: string,
  query: string,
): Node<TagTreeNodeData> {
  if (query === "") {
    return root;
  }
  return filterNode(root, locale, query.toLowerCase());
}

function filterNode(
  node: Node<TagTreeNodeData>,
  locale: string,
  query: string,
): Node<TagTreeNodeData> {
  if (node.data.name.toLowerCase().includes(query)) {
    return node;
  }
  const label = node.data.label[locale] || "";
  if (label.toLowerCase().includes(query)) {
    return node;
  }
  const children = node.children.map((child) => filterNode(child, locale, query));
  return {
    ...node,
    visible: children.some((child) => child.visible),
    children,
  };
}
