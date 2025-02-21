import type { SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";

export function filterRoot(
  root: Node<SchemaTreeNodeData>,
  locale: string,
  query: string,
): Node<SchemaTreeNodeData> {
  if (query === "") {
    return root;
  }
  return filterNode(root, locale, query.toLowerCase());
}

function filterNode(
  node: Node<SchemaTreeNodeData>,
  locale: string,
  query: string,
): Node<SchemaTreeNodeData> {
  if ("label" in node.data) {
    const label = node.data.label[locale] || "";
    if (label.toLowerCase().includes(query)) {
      return node;
    }
  }
  if ("key" in node.data && node.data.key.toLowerCase().includes(query)) {
    return node;
  }
  if ("value" in node.data && node.data.value.toLowerCase().includes(query)) {
    return node;
  }
  const children = node.children.map((child) => filterNode(child, locale, query));
  return {
    ...node,
    visible: children.some((child) => child.visible),
    children,
  };
}
