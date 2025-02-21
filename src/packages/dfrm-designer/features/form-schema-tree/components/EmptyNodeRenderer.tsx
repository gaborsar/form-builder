import React from "react";
import { MenuItemSeparator } from "../../../components/ContextMenu";
import { ExplorerTreeLeafNode } from "../../../components/ExplorerTree";
import type { SchemaTreeEmptyNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { joinLabel, usePath } from "../../schema-tree";
import { useDndProps } from "../hooks/useDndProps";
import { useLeafProps } from "../hooks/useLeafProps";
import { DuplicateMenuItem } from "./DuplicateMenuItem";
import { InsertColumnAfterMenuItem } from "./InsertColumnAfterMenuItem";
import { InsertColumnBeforeMenuItem } from "./InsertColumnBeforeMenuItem";
import { InsertFieldsetAfterMenuItem } from "./InsertFieldsetAfterMenuItem";
import { InsertFieldsetBeforeMenuItem } from "./InsertFieldsetBeforeMenuItem";
import { InsertRowAfterMenuItem } from "./InsertRowAfterMenuItem";
import { InsertRowBeforeMenuItem } from "./InsertRowBeforeMenuItem";
import { MoveDownMenuItem } from "./MoveDownMenuItem";
import { MoveUpMenuItem } from "./MoveUpMenuItem";
import { RemoveMenuItem } from "./RemoveMenuItem";

interface EmptyNodeRendererProps {
  parentType: string;
  level: number;
  parentPath: string[];
  node: Node<SchemaTreeEmptyNodeData, SchemaTreeNodeData>;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  label?: string;
}

export const EmptyNodeRenderer: React.FunctionComponent<EmptyNodeRendererProps> = React.memo(
  ({ parentType, level, parentPath, node, canMoveUp, canMoveDown, label = "" }) => {
    const path = usePath(parentPath, node);
    const dndProps = useDndProps(path);
    const leafProps = useLeafProps(path, node);

    let menu: React.ReactNode = null;
    if (parentType === "Form") {
      menu = (
        <>
          <InsertFieldsetBeforeMenuItem path={path} />
          <InsertFieldsetAfterMenuItem path={path} />
          <MenuItemSeparator />
          <DuplicateMenuItem path={path} />
          {(canMoveUp || canMoveDown) && <MenuItemSeparator />}
          {canMoveUp && <MoveUpMenuItem path={path} />}
          {canMoveDown && <MoveDownMenuItem path={path} />}
          <MenuItemSeparator />
          <RemoveMenuItem path={path} />
        </>
      );
    } else if (parentType === "Fieldset") {
      menu = (
        <>
          <InsertRowBeforeMenuItem path={path} />
          <InsertRowAfterMenuItem path={path} />
          <MenuItemSeparator />
          <DuplicateMenuItem path={path} />
          {(canMoveUp || canMoveDown) && <MenuItemSeparator />}
          {canMoveUp && <MoveUpMenuItem path={path} />}
          {canMoveDown && <MoveDownMenuItem path={path} />}
          <MenuItemSeparator />
          <RemoveMenuItem path={path} />
        </>
      );
    } else if (parentType === "Row") {
      menu = (
        <>
          <InsertColumnBeforeMenuItem path={path} />
          <InsertColumnAfterMenuItem path={path} />
          <MenuItemSeparator />
          <DuplicateMenuItem path={path} />
          {(canMoveUp || canMoveDown) && <MenuItemSeparator />}
          {canMoveUp && <MoveUpMenuItem path={path} />}
          {canMoveDown && <MoveDownMenuItem path={path} />}
          <MenuItemSeparator />
          <RemoveMenuItem path={path} />
        </>
      );
    }

    return (
      <ExplorerTreeLeafNode
        {...dndProps}
        {...leafProps}
        level={level}
        label={joinLabel(label, node.data.type)}
        menu={menu}
      />
    );
  },
);
