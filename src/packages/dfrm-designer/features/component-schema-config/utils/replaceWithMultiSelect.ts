import React from "react";
import type { ComponentSchemaTreeAction, ComponentSchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { createMultiSelectData } from "./createMultiSelectData";
import { getSelectableChildren } from "./getSelectableChildren";

export function replaceWithMultiSelect(
  dispatch: React.Dispatch<ComponentSchemaTreeAction>,
  path: string[],
  node: Node<ComponentSchemaTreeNodeData>,
): void {
  const { id, data } = node;
  const multiSelectNode: Node<ComponentSchemaTreeNodeData> = {
    id,
    visible: true,
    collapsible: true,
    collapsed: false,
    data: createMultiSelectData(data),
    children: getSelectableChildren(node),
  };
  dispatch({
    type: "component-schema-tree__replace",
    payload: { path, node: multiSelectNode },
  });
}
