import React from "react";
import { ExplorerTreeParentNode } from "../../../components/ExplorerTree";
import type { SchemaTreeFormNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { useDndProps } from "../hooks/useDndProps";
import { useParentProps } from "../hooks/useParentProps";
import { AppendFieldsetMenuItem } from "./AppendFieldsetMenuItem";
import { SchemaTreeNodeRenderer } from "./SchemaTreeNodeRenderer";

const emptyPath: string[] = [];

interface FormNodeRendererProps {
  node: Node<SchemaTreeFormNodeData, SchemaTreeNodeData>;
}

export const FormNodeRenderer: React.FunctionComponent<FormNodeRendererProps> = React.memo(
  ({ node }) => {
    const path = emptyPath;
    const dndProps = useDndProps(path);
    const parentProps = useParentProps(path, node);

    return (
      <ExplorerTreeParentNode
        {...dndProps}
        {...parentProps}
        level={0}
        label={node.data.type}
        menu={<AppendFieldsetMenuItem path={path} />}
      >
        {node.children.map((child, index) => (
          <SchemaTreeNodeRenderer
            key={child.id}
            level={1}
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
  },
);
