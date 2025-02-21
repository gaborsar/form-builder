import React from "react";
import type { ComponentSchemaTreeAction, ComponentSchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { createCheckboxGroupData } from "./createCheckboxGroupData";
import { getSelectableChildren } from "./getSelectableChildren";

export function replaceWithCheckboxGroup(
  dispatch: React.Dispatch<ComponentSchemaTreeAction>,
  path: string[],
  node: Node<ComponentSchemaTreeNodeData>,
): void {
  const { id, data } = node;
  const checkboxGroupNode: Node<ComponentSchemaTreeNodeData> = {
    id,
    visible: true,
    collapsible: true,
    collapsed: false,
    data: createCheckboxGroupData(data),
    children: getSelectableChildren(node),
  };
  dispatch({
    type: "component-schema-tree__replace",
    payload: { path, node: checkboxGroupNode },
  });
}
