import React from "react";
import type {
  ComponentTreeLeafNodeData,
  ComponentTreeNodeData,
  ComponentTreeParentNodeData,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import { LeafNodeRenderer } from "./LeafNodeRenderer";
import { ParentNodeRenderer } from "./ParentNodeRenderer";

interface NodeRendererProps {
  level: number;
  parentPath: string[];
  node: Node<ComponentTreeNodeData>;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
}

export const NodeRenderer: React.FunctionComponent<NodeRendererProps> = React.memo(
  ({ node, ...props }) =>
    node.data.type === "Parent" ? (
      <ParentNodeRenderer
        {...props}
        node={node as Node<ComponentTreeParentNodeData, ComponentTreeNodeData>}
      />
    ) : (
      <LeafNodeRenderer
        {...props}
        node={node as Node<ComponentTreeLeafNodeData, ComponentTreeNodeData>}
      />
    ),
);
