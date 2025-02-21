import React from "react";
import { ExplorerTreeLeafNode } from "../../../components/ExplorerTree";
import type { SchemaTreeComputedNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { joinLabel, usePath } from "../../schema-tree";
import { useDndProps } from "../hooks/useDndProps";
import { useLeafProps } from "../hooks/useLeafProps";

interface ComputedNodeRendererProps {
  level: number;
  parentPath: string[];
  node: Node<SchemaTreeComputedNodeData, SchemaTreeNodeData>;
  label?: string;
}

export const ComputedNodeRenderer: React.FunctionComponent<ComputedNodeRendererProps> = React.memo(
  ({ level, parentPath, node, label = "" }) => {
    const path = usePath(parentPath, node);
    const dndProps = useDndProps(path);
    const leafProps = useLeafProps(path, node);
    return (
      <ExplorerTreeLeafNode
        {...dndProps}
        {...leafProps}
        level={level}
        label={joinLabel(label, node.data.type)}
      />
    );
  },
);
