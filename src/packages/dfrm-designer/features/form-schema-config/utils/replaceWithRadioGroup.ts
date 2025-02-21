import React from "react";
import type { FormSchemaTreeAction, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { createRadioGroupData } from "./createRadioGroupData";
import { getSelectableChildren } from "./getSelectableChildren";

export function replaceWithRadioGroup(
  dispatch: React.Dispatch<FormSchemaTreeAction>,
  path: string[],
  node: Node<SchemaTreeNodeData>,
): void {
  const radioGroupNode: Node<SchemaTreeNodeData> = {
    id: node.id,
    visible: true,
    collapsible: true,
    collapsed: false,
    data: createRadioGroupData(node.data),
    children: getSelectableChildren(node),
  };
  dispatch({
    type: "form-schema-tree__replace",
    payload: { path, node: radioGroupNode },
  });
}
