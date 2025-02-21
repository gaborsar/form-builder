import React from "react";
import { MenuItemSeparator } from "../../../components/ContextMenu";
import { ExplorerTreeParentNode } from "../../../components/ExplorerTree";
import type { SchemaTreeNodeData, SchemaTreeRowNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { joinLabel, usePath } from "../../schema-tree";
import { useDndProps } from "../hooks/useDndProps";
import { useParentProps } from "../hooks/useParentProps";
import { AppendColumnMenuItem } from "./AppendColumnMenuItem";
import { DuplicateMenuItem } from "./DuplicateMenuItem";
import { InsertRowAfterMenuItem } from "./InsertRowAfterMenuItem";
import { InsertRowBeforeMenuItem } from "./InsertRowBeforeMenuItem";
import { MoveDownMenuItem } from "./MoveDownMenuItem";
import { MoveUpMenuItem } from "./MoveUpMenuItem";
import { RemoveMenuItem } from "./RemoveMenuItem";
import { SchemaTreeNodeRenderer } from "./SchemaTreeNodeRenderer";

interface RowNodeRendererProps {
  parentType: string;
  level: number;
  parentPath: string[];
  node: Node<SchemaTreeRowNodeData, SchemaTreeNodeData>;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  label?: string;
}

export const RowNodeRenderer: React.FunctionComponent<RowNodeRendererProps> = React.memo(
  ({ parentType, level, parentPath, node, canMoveUp = false, canMoveDown = false, label = "" }) => {
    const path = usePath(parentPath, node);
    const dndProps = useDndProps(path);
    const parentProps = useParentProps(path, node);

    const menu = (
      <>
        <AppendColumnMenuItem path={path} />
        {(parentType === "Fieldset" || parentType === "FieldGroupList") && (
          <>
            <MenuItemSeparator />
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
        )}
      </>
    );

    return (
      <ExplorerTreeParentNode
        {...dndProps}
        {...parentProps}
        level={level}
        label={joinLabel(label, node.data.type)}
        menu={menu}
      >
        {node.children.map((child, index) => (
          <SchemaTreeNodeRenderer
            key={child.id}
            level={level + 1}
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
