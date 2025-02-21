import React from "react";
import { ExplorerTreeParentNode } from "../../../components/ExplorerTree";
import {
  type SchemaTreeFieldListNodeData,
  type SchemaTreeNodeData,
  useIntlState,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import { joinLabel, usePath } from "../../schema-tree";
import { useDndProps } from "../hooks/useDndProps";
import { useParentProps } from "../hooks/useParentProps";
import { SchemaTreeNodeRenderer } from "./SchemaTreeNodeRenderer";

interface FieldListNodeRendererProps {
  level: number;
  parentPath: string[];
  node: Node<SchemaTreeFieldListNodeData, SchemaTreeNodeData>;
  label?: string;
}

export const FieldListNodeRenderer: React.FunctionComponent<FieldListNodeRendererProps> =
  React.memo(({ level, parentPath, node, label = "" }) => {
    const { locale } = useIntlState();

    const path = usePath(parentPath, node);
    const dndProps = useDndProps(path);
    const parentProps = useParentProps(path, node);

    return (
      <ExplorerTreeParentNode
        {...dndProps}
        {...parentProps}
        level={level}
        label={joinLabel(label, joinLabel(node.data.type, node.data.label[locale] || "anonymous"))}
      >
        <SchemaTreeNodeRenderer
          parentType={node.data.type}
          level={level + 1}
          parentPath={path}
          node={node.children[0]}
          canMoveUp={false}
          canMoveDown={false}
          label="Input"
        />
      </ExplorerTreeParentNode>
    );
  });
