import React from "react";
import type { FormSchemaTreeAction, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { createCheckboxGroupData } from "./createCheckboxGroupData";
import { getSelectableChildren } from "./getSelectableChildren";

export function replaceWithCheckboxGroup(
  dispatch: React.Dispatch<FormSchemaTreeAction>,
  path: string[],
  node: Node<SchemaTreeNodeData>,
): void {
  const { id, data } = node;
  const checkboxGroupNode: Node<SchemaTreeNodeData> = {
    id,
    visible: true,
    collapsible: true,
    collapsed: false,
    data: createCheckboxGroupData(data),
    children: getSelectableChildren(node),
  };
  dispatch({
    type: "form-schema-tree__replace",
    payload: { path, node: checkboxGroupNode },
  });
}
