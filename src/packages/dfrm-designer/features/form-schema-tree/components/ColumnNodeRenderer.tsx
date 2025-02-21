import React from "react";
import { MenuItemSeparator } from "../../../components/ContextMenu";
import { ExplorerTreeParentNode } from "../../../components/ExplorerTree";
import type { SchemaTreeColumnNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { joinLabel, usePath } from "../../schema-tree";
import { useDndProps } from "../hooks/useDndProps";
import { useParentProps } from "../hooks/useParentProps";
import { DuplicateMenuItem } from "./DuplicateMenuItem";
import { InsertColumnAfterMenuItem } from "./InsertColumnAfterMenuItem";
import { InsertColumnBeforeMenuItem } from "./InsertColumnBeforeMenuItem";
import { MoveDownMenuItem } from "./MoveDownMenuItem";
import { MoveUpMenuItem } from "./MoveUpMenuItem";
import { RemoveMenuItem } from "./RemoveMenuItem";
import { SchemaTreeNodeRenderer } from "./SchemaTreeNodeRenderer";

interface ColumnNodeRendererProps {
  parentType: string;
  level: number;
  parentPath: string[];
  node: Node<SchemaTreeColumnNodeData, SchemaTreeNodeData>;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  label?: string;
}

export const ColumnNodeRenderer: React.FunctionComponent<ColumnNodeRendererProps> = React.memo(
  ({ parentType, level, parentPath, node, canMoveUp = false, canMoveDown = false, label = "" }) => {
    const path = usePath(parentPath, node);
    const dndProps = useDndProps(path);
    const parentProps = useParentProps(path, node);

    let menu: React.ReactNode = null;
    if (parentType === "Row") {
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
      <ExplorerTreeParentNode
        {...dndProps}
        {...parentProps}
        level={level}
        label={`${joinLabel(label, node.data.type)} - ${node.data.width}${node.data.grow ? "+" : ""}`}
        menu={menu}
      >
        <SchemaTreeNodeRenderer
          parentType={node.data.type}
          level={level + 1}
          parentPath={path}
          node={node.children[0]}
          canMoveUp={false}
          canMoveDown={false}
        />
      </ExplorerTreeParentNode>
    );
  },
);
