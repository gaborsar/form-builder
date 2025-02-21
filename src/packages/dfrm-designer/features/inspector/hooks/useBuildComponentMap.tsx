import React from "react";
import type {
  ComponentTreeLeafNodeData,
  ComponentTreeNodeData,
} from "../../../model/component-tree";
import type { Node } from "../../../utils/tree";
import type { ComponentMap } from "../state/types";

interface BuildComponentMapJob {
  node: Node<ComponentTreeNodeData>;
  next: BuildComponentMapJob | null;
}

export function useBuildComponentMap(root: Node<ComponentTreeNodeData>): ComponentMap {
  return React.useMemo(() => {
    const map: ComponentMap = {};
    let first: BuildComponentMapJob | null = { node: root, next: null };
    let last = first;
    while (first !== null) {
      const { node } = first;
      if (node.data.type === "Parent") {
        for (const child of node.children) {
          last.next = { node: child, next: null };
          last = last.next;
        }
      } else {
        map[node.id] = node as Node<ComponentTreeLeafNodeData, ComponentTreeNodeData>;
      }
      first = first.next;
    }
    return map;
  }, [root]);
}
