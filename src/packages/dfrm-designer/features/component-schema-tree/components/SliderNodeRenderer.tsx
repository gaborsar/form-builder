import React from "react";
import { ExplorerTreeParentNode } from "../../../components/ExplorerTree";
import type { SchemaTreeOptionNodeData, SchemaTreeSliderNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { useDndProps } from "../hooks/useDndProps";
import { useParentProps } from "../hooks/useParentProps";
import { AppendOptionMenuItem } from "./AppendOptionMenuItem";
import { OptionNodeRenderer } from "./OptionNodeRenderer";

const path: string[] = [];

interface SliderNodeRendererProps {
  node: Node<SchemaTreeSliderNodeData, SchemaTreeOptionNodeData>;
}

export const SliderNodeRenderer: React.FunctionComponent<SliderNodeRendererProps> = React.memo(
  ({ node }) => {
    const dndProps = useDndProps(path);
    const parentProps = useParentProps(path, node);
    return (
      <ExplorerTreeParentNode
        {...dndProps}
        {...parentProps}
        level={0}
        label={node.data.type}
        menu={<AppendOptionMenuItem path={path} />}
      >
        {node.children.map((child, index) => (
          <OptionNodeRenderer
            key={child.id}
            level={1}
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
