import React from "react";
import { ExplorerTreeParentNode } from "../../../components/ExplorerTree";
import type { SchemaTreeNodeData, SchemaTreeObjectNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { joinLabel, usePath } from "../../schema-tree";
import { useDndProps } from "../hooks/useDndProps";
import { useParentProps } from "../hooks/useParentProps";
import { AppendRowMenuItem } from "./AppendRowMenuItem";
import { SchemaTreeNodeRenderer } from "./SchemaTreeNodeRenderer";

interface ObjectNodeRendererProps {
  level: number;
  parentPath: string[];
  node: Node<SchemaTreeObjectNodeData, SchemaTreeNodeData>;
  label?: string;
}

export const ObjectNodeRenderer: React.FunctionComponent<ObjectNodeRendererProps> = React.memo(
  ({ level, parentPath, node, label = "" }) => {
    const path = usePath(parentPath, node);
    const dndProps = useDndProps(path);
    const parentProps = useParentProps(path, node);
    return (
      <ExplorerTreeParentNode
        {...dndProps}
        {...parentProps}
        level={level}
        label={joinLabel(label, node.data.type)}
        menu={<AppendRowMenuItem path={path} />}
      >
        {node.children.map((child, index) => (
          <SchemaTreeNodeRenderer
            key={child.id}
            parentType={node.data.type}
            level={level + 1}
            parentPath={path}
            node={child}
            canMoveUp={index !== 0}
            canMoveDown={index !== node.children.length - 1}
            label={`${index + 1}.`}
          />
        ))}
      </ExplorerTreeParentNode>
    );
  },
);
