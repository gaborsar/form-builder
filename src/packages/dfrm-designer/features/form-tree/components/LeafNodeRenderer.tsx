import React from "react";
import { MenuItemSeparator } from "../../../components/ContextMenu";
import { ExplorerTreeLeafNode } from "../../../components/ExplorerTree";
import { type FormTreeLeafNodeData, type FormTreeNodeData, useIntlState } from "../../../model";
import type { Node } from "../../../utils/tree";
import { useDndProps } from "../hooks/useDndProps";
import { useLeafProps } from "../hooks/useLeafProps";
import { usePath } from "../hooks/usePath";
import { DuplicateMenuItem } from "./DuplicateMenuItem";
import { InsertFormAfterMenuItem } from "./InsertFormAfterMenuItem";
import { InsertFormBeforeMenuItem } from "./InsertFormBeforeMenuItem";
import { MoveDownMenuItem } from "./MoveDownMenuItem";
import { MoveUpMenuItem } from "./MoveUpMenuItem";
import { OpenButton } from "./OpenButton";
import { OpenMenuItem } from "./OpenMenuItem";
import { RemoveMenuItem } from "./RemoveMenuItem";

interface LeafNodeRendererProps {
  level: number;
  parentPath: string[];
  node: Node<FormTreeLeafNodeData, FormTreeNodeData>;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
}

export const LeafNodeRenderer: React.FunctionComponent<LeafNodeRendererProps> = React.memo(
  ({ level, parentPath, node, canMoveUp = false, canMoveDown = false }) => {
    const { locale } = useIntlState();

    const path = usePath(parentPath, node);
    const dndProps = useDndProps(path);
    const leafProps = useLeafProps(path, node);

    const menu = (
      <>
        <OpenMenuItem path={path} />
        <MenuItemSeparator />
        <InsertFormBeforeMenuItem path={path} />
        <InsertFormAfterMenuItem path={path} />
        <MenuItemSeparator />
        <DuplicateMenuItem path={path} />
        {(canMoveUp || canMoveDown) && <MenuItemSeparator />}
        {canMoveUp && <MoveUpMenuItem path={path} />}
        {canMoveDown && <MoveDownMenuItem path={path} />}
        <MenuItemSeparator />
        <RemoveMenuItem path={path} />
      </>
    );

    return (
      <ExplorerTreeLeafNode
        {...dndProps}
        {...leafProps}
        level={level}
        actions={<OpenButton path={path} />}
        menu={menu}
        label={node.data.label[locale] || node.data.name || "anonymous"}
      />
    );
  },
);
