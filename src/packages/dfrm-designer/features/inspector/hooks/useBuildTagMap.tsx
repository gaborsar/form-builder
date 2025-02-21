import React from "react";
import type { TagTreeLeafNodeData, TagTreeNodeData, TagTreeParentNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { TagMap } from "../state/types";

export function useBuildTagMap(root: Node<TagTreeNodeData>): TagMap {
  return React.useMemo(() => {
    const map: TagMap = {};
    for (const parent of root.children) {
      if (parent.data.type === "Parent") {
        for (const leaf of parent.children) {
          if (leaf.data.type === "Leaf") {
            map[leaf.id] = {
              parent: parent as Node<TagTreeParentNodeData, TagTreeNodeData>,
              leaf: leaf as Node<TagTreeLeafNodeData, TagTreeNodeData>,
            };
          }
        }
      }
    }
    return map;
  }, [root]);
}
