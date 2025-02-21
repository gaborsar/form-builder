import React from "react";
import type { ComponentSchemaTreeAction, ComponentSchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { createButtonGroupData } from "./createButtonGroupData";
import { getSelectableChildren } from "./getSelectableChildren";

export function replaceWithButtonGroup(
  dispatch: React.Dispatch<ComponentSchemaTreeAction>,
  path: string[],
  node: Node<ComponentSchemaTreeNodeData>,
): void {
  const { id, data } = node;
  const buttonGroupNode: Node<ComponentSchemaTreeNodeData> = {
    id,
    visible: true,
    collapsible: true,
    collapsed: false,
    data: createButtonGroupData(data),
    children: getSelectableChildren(node),
  };
  dispatch({
    type: "component-schema-tree__replace",
    payload: { path, node: buttonGroupNode },
  });
}
