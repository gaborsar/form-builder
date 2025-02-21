import React from "react";
import type { ComponentSchemaTreeAction, ComponentSchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { createSwitchGroupData } from "./createSwitchGroupData";
import { getSelectableChildren } from "./getSelectableChildren";

export function replaceWithSwitchGroup(
  dispatch: React.Dispatch<ComponentSchemaTreeAction>,
  path: string[],
  node: Node<ComponentSchemaTreeNodeData>,
): void {
  const switchGroupNode: Node<ComponentSchemaTreeNodeData> = {
    id: node.id,
    visible: true,
    collapsible: true,
    collapsed: false,
    data: createSwitchGroupData(node.data),
    children: getSelectableChildren(node),
  };
  dispatch({
    type: "component-schema-tree__replace",
    payload: { path, node: switchGroupNode },
  });
}
