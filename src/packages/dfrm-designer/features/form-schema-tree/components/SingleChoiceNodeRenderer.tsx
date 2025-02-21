import React from "react";
import { ExplorerTreeParentNode } from "../../../components/ExplorerTree";
import type {
  SchemaTreeButtonGroupNodeData,
  SchemaTreeDropdownNodeData,
  SchemaTreeOptionNodeData,
  SchemaTreeRadioGroupNodeData,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import { joinLabel, usePath } from "../../schema-tree";
import { useDndProps } from "../hooks/useDndProps";
import { useParentProps } from "../hooks/useParentProps";
import { AppendOptionMenuItem } from "./AppendOptionMenuItem";
import { SchemaTreeNodeRenderer } from "./SchemaTreeNodeRenderer";

interface SingleChoiceNodeRendererProps {
  level: number;
  parentPath: string[];
  node: Node<
    SchemaTreeDropdownNodeData | SchemaTreeButtonGroupNodeData | SchemaTreeRadioGroupNodeData,
    SchemaTreeOptionNodeData
  >;
  label?: string;
}

export const SingleChoiceNodeRenderer: React.FunctionComponent<SingleChoiceNodeRendererProps> =
  React.memo(({ level, parentPath, node, label = "" }) => {
    const path = usePath(parentPath, node);
    const dndProps = useDndProps(path);
    const parentProps = useParentProps(path, node);
    return (
      <ExplorerTreeParentNode
        {...dndProps}
        {...parentProps}
        level={level}
        label={joinLabel(label, node.data.type)}
        menu={<AppendOptionMenuItem path={path} />}
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
  });
