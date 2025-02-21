import React from "react";
import { MenuItemSeparator } from "../../../components/ContextMenu";
import { ExplorerTreeParentNode } from "../../../components/ExplorerTree";
import {
  type TagTreeLeafNodeData,
  type TagTreeNodeData,
  type TagTreeParentNodeData,
  useIntlState,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import { useDndProps } from "../hooks/useDndProps";
import { useParentProps } from "../hooks/useParentProps";
import { usePath } from "../hooks/usePath";
import { AppendTagMenuItem } from "./AppendTagMenuItem";
import { DuplicateMenuItem } from "./DuplicateMenuItem";
import { InsertGroupAfterMenuItem } from "./InsertGroupAfterMenuItem";
import { InsertGroupBeforeMenuItem } from "./InsertGroupBeforeMenuItem";
import { LeafNodeRenderer } from "./LeafNodeRenderer";
import { MoveDownMenuItem } from "./MoveDownMenuItem";
import { MoveUpMenuItem } from "./MoveUpMenuItem";
import { RemoveMenuItem } from "./RemoveMenuItem";

const emptyPath: string[] = [];

interface ParentNodeRendererProps {
  node: Node<TagTreeParentNodeData, TagTreeNodeData>;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
}

export const ParentNodeRenderer: React.FunctionComponent<ParentNodeRendererProps> = React.memo(
  ({ node, canMoveUp = false, canMoveDown = false }) => {
    const { locale } = useIntlState();

    const path = usePath(emptyPath, node);
    const dndProps = useDndProps(path);
    const parentProps = useParentProps(path, node);

    const menu = (
      <>
        <AppendTagMenuItem path={path} />
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
        level={0}
        label={node.data.label[locale] || node.data.name || "anonymous"}
        menu={menu}
      >
        {node.children.map((child, index) => (
          <LeafNodeRenderer
            key={child.id}
            parentPath={path}
            node={child as Node<TagTreeLeafNodeData, TagTreeNodeData>}
            canMoveUp={index !== 0}
            canMoveDown={index !== node.children.length - 1}
          />
        ))}
      </ExplorerTreeParentNode>
    );
  },
);
