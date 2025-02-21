import React from "react";
import { type TagTreeLeafNodeData, type TagTreeNodeData, useTagTreeState } from "../../../model";
import { type Node, findNodeById } from "../../../utils/tree";

export function useTag(id: string): Node<TagTreeLeafNodeData, TagTreeNodeData> | null {
  const { root } = useTagTreeState();
  return React.useMemo(() => {
    try {
      const node = findNodeById(root, id);
      if (node.data.type === "Leaf") {
        return node as Node<TagTreeLeafNodeData, TagTreeNodeData>;
      }
    } catch (error) {}
    return null;
  }, [root, id]);
}
