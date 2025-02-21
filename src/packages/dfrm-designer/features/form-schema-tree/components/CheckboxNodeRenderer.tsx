import React from "react";
import { ExplorerTreeLeafNode } from "../../../components/ExplorerTree";
import type { SchemaTreeCheckboxNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { joinLabel, usePath } from "../../schema-tree";
import { useDndProps } from "../hooks/useDndProps";
import { useLeafProps } from "../hooks/useLeafProps";

interface CheckboxNodeRendererProps {
  level: number;
  parentPath: string[];
  node: Node<SchemaTreeCheckboxNodeData, SchemaTreeNodeData>;
  label?: string;
}

export const CheckboxNodeRenderer: React.FunctionComponent<CheckboxNodeRendererProps> = React.memo(
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
