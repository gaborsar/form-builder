import React from "react";
import { ExplorerTreeParentNode } from "../../../components/ExplorerTree";
import {
  type SchemaTreeFieldGroupListNodeData,
  type SchemaTreeOptionNodeData,
  useIntlState,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import { joinLabel, usePath } from "../../schema-tree";
import { useDndProps } from "../hooks/useDndProps";
import { useParentProps } from "../hooks/useParentProps";
import { AppendRowMenuItem } from "./AppendRowMenuItem";
import { SchemaTreeNodeRenderer } from "./SchemaTreeNodeRenderer";

interface FieldGroupListNodeRendererProps {
  level: number;
  parentPath: string[];
  node: Node<SchemaTreeFieldGroupListNodeData, SchemaTreeOptionNodeData>;
  label?: string;
}

export const FieldGroupListNodeRenderer: React.FunctionComponent<FieldGroupListNodeRendererProps> =
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
        menu={<AppendRowMenuItem path={path} />}
      >
        {node.children.map((child, index) => (
          <SchemaTreeNodeRenderer
            key={child.id}
            level={level + 1}
            parentType={node.data.type}
            parentPath={path}
            node={child}
            canMoveUp={index !== 0}
            canMoveDown={index !== node.children.length - 1}
            label={`${index + 1}.`}
          />
        ))}
      </ExplorerTreeParentNode>
    );
  });
