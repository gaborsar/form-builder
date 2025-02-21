import React from "react";
import { MenuItemSeparator } from "../../../components/ContextMenu";
import { ExplorerTreeLeafNode } from "../../../components/ExplorerTree";
import {
  type SchemaTreeNodeData,
  type SchemaTreeOptionNodeData,
  useIntlState,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import { joinLabel, usePath } from "../../schema-tree";
import { useTag } from "../../tag-tree";
import { useDndProps } from "../hooks/useDndProps";
import { useLeafProps } from "../hooks/useLeafProps";
import { InsertOptionAfterMenuItem } from "./InsertOptionAfterMenuItem";
import { InsertOptionBeforeMenuItem } from "./InsertOptionBeforeMenuItem";
import { MoveDownMenuItem } from "./MoveDownMenuItem";
import { MoveUpMenuItem } from "./MoveUpMenuItem";
import { RemoveMenuItem } from "./RemoveMenuItem";

interface OptionNodeRendererProps {
  level: number;
  parentPath: string[];
  node: Node<SchemaTreeOptionNodeData, SchemaTreeNodeData>;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  label?: string;
}

export const OptionNodeRenderer: React.FunctionComponent<OptionNodeRendererProps> = React.memo(
  ({ level, parentPath, node, canMoveUp = false, canMoveDown = false, label = "" }) => {
    const path = usePath(parentPath, node);
    const dndProps = useDndProps(path);
    const leafProps = useLeafProps(path, node);
    const optionLabel = useOptionLabel(node);

    const menu = (
      <>
        <InsertOptionBeforeMenuItem path={path} />
        <InsertOptionAfterMenuItem path={path} />
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
        label={joinLabel(label, joinLabel(node.data.type, optionLabel))}
        menu={menu}
      />
    );
  },
);

function useOptionLabel(node: Node<SchemaTreeOptionNodeData>): string {
  const { locale } = useIntlState();
  const tag = useTag(node.data.id || "");
  return React.useMemo(() => {
    const nodeLabel = node.data.label[locale] || "";
    if (nodeLabel !== "") {
      return nodeLabel;
    }
    if (tag !== null) {
      const tagLabel = tag.data.label[locale] || "";
      if (tagLabel !== "") {
        return tagLabel;
      }
    }
    return "anonymous";
  }, [node, tag, locale]);
}
