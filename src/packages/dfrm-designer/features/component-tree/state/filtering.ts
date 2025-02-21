import type { ComponentTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";

export function filterRoot(
  root: Node<ComponentTreeNodeData>,
  locale: string,
  query: string,
): Node<ComponentTreeNodeData> {
  if (query === "") {
    return root;
  }
  return filterNode(root, locale, query.toLowerCase());
}

function filterNode(
  node: Node<ComponentTreeNodeData>,
  locale: string,
  query: string,
): Node<ComponentTreeNodeData> {
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
