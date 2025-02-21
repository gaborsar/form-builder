import React from "react";
import { MenuItemSeparator } from "../../../components/ContextMenu";
import { ExplorerTreeParentNode } from "../../../components/ExplorerTree";
import type { SchemaTreeConditionalNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { joinLabel, usePath } from "../../schema-tree";
import { useDndProps } from "../hooks/useDndProps";
import { useParentProps } from "../hooks/useParentProps";
import { DuplicateMenuItem } from "./DuplicateMenuItem";
import { InsertColumnAfterMenuItem } from "./InsertColumnAfterMenuItem";
import { InsertColumnBeforeMenuItem } from "./InsertColumnBeforeMenuItem";
import { InsertFieldsetAfterMenuItem } from "./InsertFieldsetAfterMenuItem";
import { InsertFieldsetBeforeMenuItem } from "./InsertFieldsetBeforeMenuItem";
import { InsertRowAfterMenuItem } from "./InsertRowAfterMenuItem";
import { InsertRowBeforeMenuItem } from "./InsertRowBeforeMenuItem";
import { RemoveMenuItem } from "./RemoveMenuItem";
import { SchemaTreeNodeRenderer } from "./SchemaTreeNodeRenderer";

interface ConditionalNodeRendererProps {
  level: number;
  parentType: string;
  parentPath: string[];
  node: Node<SchemaTreeConditionalNodeData, SchemaTreeNodeData>;
  label?: string;
}

export const ConditionalNodeRenderer: React.FunctionComponent<ConditionalNodeRendererProps> =
  React.memo(({ level, parentType, parentPath, node, label = "" }) => {
    const path = usePath(parentPath, node);
    const dndProps = useDndProps(path);
    const parentProps = useParentProps(path, node);

    let menu: React.ReactNode = null;
    if (parentType === "Form") {
      menu = (
        <>
          <InsertFieldsetBeforeMenuItem path={path} />
          <InsertFieldsetAfterMenuItem path={path} />
          <MenuItemSeparator />
          <DuplicateMenuItem path={path} />
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
        label={joinLabel(label, "If")}
        menu={menu}
      >
        <SchemaTreeNodeRenderer
          parentType={node.data.type}
          level={level + 1}
          parentPath={path}
          node={node.children[0]}
          canMoveUp={false}
          canMoveDown={false}
          label="Then"
        />
        <SchemaTreeNodeRenderer
          parentType={node.data.type}
          level={level + 1}
          parentPath={path}
          node={node.children[1]}
          canMoveUp={false}
          canMoveDown={false}
          label="Else"
        />
      </ExplorerTreeParentNode>
    );
  });
