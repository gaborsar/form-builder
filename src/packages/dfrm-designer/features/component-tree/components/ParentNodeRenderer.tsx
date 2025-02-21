import React from "react";
import { MenuItemSeparator } from "../../../components/ContextMenu";
import { ExplorerTreeParentNode } from "../../../components/ExplorerTree";
import {
  type ComponentTreeNodeData,
  type ComponentTreeParentNodeData,
  useIntlState,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import { useDndProps } from "../hooks/useDndProps";
import { useParentProps } from "../hooks/useParentProps";
import { usePath } from "../hooks/usePath";
import { AppendComponentMenuItem } from "./AppendComponentMenuItem";
import { AppendGroupMenuItem } from "./AppendGroupMenuItem";
import { DuplicateMenuItem } from "./DuplicateMenuItem";
import { InsertGroupAfterMenuItem } from "./InsertGroupAfterMenuItem";
import { InsertGroupBeforeMenuItem } from "./InsertGroupBeforeMenuItem";
import { MoveDownMenuItem } from "./MoveDownMenuItem";
import { MoveUpMenuItem } from "./MoveUpMenuItem";
import { NodeRenderer } from "./NodeRenderer";
import { RemoveMenuItem } from "./RemoveMenuItem";

interface ParentNodeRendererProps {
  level: number;
  parentPath: string[];
  node: Node<ComponentTreeParentNodeData, ComponentTreeNodeData>;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
}

export const ParentNodeRenderer: React.FunctionComponent<ParentNodeRendererProps> = React.memo(
  ({ level, parentPath, node, canMoveUp = false, canMoveDown = false }) => {
    const { locale } = useIntlState();

    const path = usePath(parentPath, node);
    const dndProps = useDndProps(path);
    const parentProps = useParentProps(path, node);

    const menu = (
      <>
        <AppendGroupMenuItem path={path} />
        <AppendComponentMenuItem path={path} />
        <MenuItemSeparator />
        <InsertGroupBeforeMenuItem path={path} />
        <InsertGroupAfterMenuItem path={path} />
        <MenuItemSeparator />
        <DuplicateMenuItem path={path} />
        {(canMoveUp || canMoveDown) && <MenuItemSeparator />}
        {canMoveUp && <MoveUpMenuItem path={path} />}
        {canMoveDown && <MoveDownMenuItem path={path} />}
        <MenuItemSeparator />
        <RemoveMenuItem path={path} node={node} />
      </>
    );

    return (
      <ExplorerTreeParentNode
        {...dndProps}
        {...parentProps}
        level={level}
        label={node.data.label[locale] || node.data.name || "anonymous"}
        menu={menu}
      >
        {node.children.map((child, index) => (
          <NodeRenderer
            key={child.id}
            level={level + 1}
            parentPath={path}
            node={child}
            canMoveUp={index !== 0}
            canMoveDown={index !== node.children.length - 1}
          />
        ))}
      </ExplorerTreeParentNode>
    );
  },
);
