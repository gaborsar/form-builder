import React from "react";
import type { FormSchemaTreeAction, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { createButtonGroupData } from "./createButtonGroupData";
import { getSelectableChildren } from "./getSelectableChildren";

export function replaceWithButtonGroup(
  dispatch: React.Dispatch<FormSchemaTreeAction>,
  path: string[],
  node: Node<SchemaTreeNodeData>,
): void {
  const { id, data } = node;
  const buttonGroupNode: Node<SchemaTreeNodeData> = {
    id,
    visible: true,
    collapsible: true,
    collapsed: false,
    data: createButtonGroupData(data),
    children: getSelectableChildren(node),
  };
  dispatch({
    type: "form-schema-tree__replace",
    payload: { path, node: buttonGroupNode },
  });
}
