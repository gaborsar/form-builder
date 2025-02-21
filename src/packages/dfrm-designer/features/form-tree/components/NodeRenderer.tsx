import React from "react";
import type {
  FormTreeLeafNodeData,
  FormTreeNodeData,
  FormTreeParentNodeData,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import { LeafNodeRenderer } from "./LeafNodeRenderer";
import { ParentNodeRenderer } from "./ParentNodeRenderer";

interface NodeRendererProps {
  level: number;
  parentPath: string[];
  node: Node<FormTreeNodeData>;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
}

export const NodeRenderer: React.FunctionComponent<NodeRendererProps> = React.memo(
  ({ node, ...props }) =>
    node.data.type === "Parent" ? (
      <ParentNodeRenderer
        {...props}
        node={node as Node<FormTreeParentNodeData, FormTreeNodeData>}
      />
    ) : (
      <LeafNodeRenderer {...props} node={node as Node<FormTreeLeafNodeData, FormTreeNodeData>} />
    ),
);
