import React from "react";
import type { ComponentSchemaTreeAction, ComponentSchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { createRadioGroupData } from "./createRadioGroupData";
import { getSelectableChildren } from "./getSelectableChildren";

export function replaceWithRadioGroup(
  dispatch: React.Dispatch<ComponentSchemaTreeAction>,
  path: string[],
  node: Node<ComponentSchemaTreeNodeData>,
): void {
  const radioGroupNode: Node<ComponentSchemaTreeNodeData> = {
    id: node.id,
    visible: true,
    collapsible: true,
    collapsed: false,
    data: createRadioGroupData(node.data),
    children: getSelectableChildren(node),
  };
  dispatch({
    type: "component-schema-tree__replace",
    payload: { path, node: radioGroupNode },
  });
}
