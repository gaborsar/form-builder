import React from "react";
import { MenuItemSeparator } from "../../../components/ContextMenu";
import { ExplorerTreeParentNode } from "../../../components/ExplorerTree";
import {
  type SchemaTreeFieldsetNodeData,
  type SchemaTreeNodeData,
  useIntlState,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import { joinLabel, usePath } from "../../schema-tree";
import { useDndProps } from "../hooks/useDndProps";
import { useParentProps } from "../hooks/useParentProps";
import { AppendRowMenuItem } from "./AppendRowMenuItem";
import { DuplicateMenuItem } from "./DuplicateMenuItem";
import { InsertFieldsetAfterMenuItem } from "./InsertFieldsetAfterMenuItem";
import { InsertFieldsetBeforeMenuItem } from "./InsertFieldsetBeforeMenuItem";
import { MoveDownMenuItem } from "./MoveDownMenuItem";
import { MoveUpMenuItem } from "./MoveUpMenuItem";
import { RemoveMenuItem } from "./RemoveMenuItem";
import { SchemaTreeNodeRenderer } from "./SchemaTreeNodeRenderer";

interface FieldsetNodeRendererProps {
  parentType: string;
  level: number;
  parentPath: string[];
  node: Node<SchemaTreeFieldsetNodeData, SchemaTreeNodeData>;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  label?: string;
}

export const FieldsetNodeRenderer: React.FunctionComponent<FieldsetNodeRendererProps> = React.memo(
  ({ parentType, level, parentPath, node, canMoveUp = false, canMoveDown = false, label = "" }) => {
    const { locale } = useIntlState();

    const path = usePath(parentPath, node);
    const dndProps = useDndProps(path);
    const parentProps = useParentProps(path, node);

    const menu = (
      <>
        <AppendRowMenuItem path={path} />
        {parentType === "Form" && (
          <>
            <MenuItemSeparator />
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
        )}
      </>
    );

    return (
      <ExplorerTreeParentNode
        {...dndProps}
        {...parentProps}
        level={level}
        label={joinLabel(label, joinLabel(node.data.type, node.data.label[locale] || "anonymous"))}
        menu={menu}
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
  },
);
