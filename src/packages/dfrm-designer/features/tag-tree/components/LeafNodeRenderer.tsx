import React from "react";
import { MenuItemSeparator } from "../../../components/ContextMenu";
import { ExplorerTreeLeafNode } from "../../../components/ExplorerTree";
import { type TagTreeLeafNodeData, type TagTreeNodeData, useIntlState } from "../../../model";
import type { Node } from "../../../utils/tree";
import { useTagReferenceMap } from "../../inspector";
import { useDndProps } from "../hooks/useDndProps";
import { useLeafProps } from "../hooks/useLeafProps";
import { usePath } from "../hooks/usePath";
import { DuplicateMenuItem } from "./DuplicateMenuItem";
import { InsertTagAfterMenuItem } from "./InsertTagAfterMenuItem";
import { InsertTagBeforeMenuItem } from "./InsertTagBeforeMenuItem";
import { MoveDownMenuItem } from "./MoveDownMenuItem";
import { MoveUpMenuItem } from "./MoveUpMenuItem";
import { OpenButton } from "./OpenButton";
import { OpenMenuItem } from "./OpenMenuItem";
import { RemoveMenuItem } from "./RemoveMenuItem";
import { ShowReferencesMenuItem } from "./ShowReferencesMenuItem";

interface LeafNodeRendererProps {
  parentPath: string[];
  node: Node<TagTreeLeafNodeData, TagTreeNodeData>;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
}

export const LeafNodeRenderer: React.FunctionComponent<LeafNodeRendererProps> = React.memo(
  ({ parentPath, node, canMoveUp = false, canMoveDown = false }) => {
    const { locale } = useIntlState();
    const {
      [node.id]: { length: refCount } = [],
    } = useTagReferenceMap();

    const path = usePath(parentPath, node);
    const dndProps = useDndProps(path);
    const leafProps = useLeafProps(path, node);

    const menu = (
      <>
        <OpenMenuItem path={path} />
        <ShowReferencesMenuItem path={path} />
        <MenuItemSeparator />
        <InsertTagBeforeMenuItem path={path} />
        <InsertTagAfterMenuItem path={path} />
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
      <ExplorerTreeLeafNode
        {...dndProps}
        {...leafProps}
        level={1}
        actions={<OpenButton path={path} />}
        menu={menu}
        label={
          (node.data.label[locale] || node.data.name || "anonymous") +
          (refCount === 0 ? "" : ` (${refCount})`)
        }
      />
    );
  },
);
