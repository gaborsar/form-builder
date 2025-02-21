import React from "react";
import type { FormSchemaTreeAction, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { createSwitchGroupData } from "./createSwitchGroupData";
import { getSelectableChildren } from "./getSelectableChildren";

export function replaceWithSwitchGroup(
  dispatch: React.Dispatch<FormSchemaTreeAction>,
  path: string[],
  node: Node<SchemaTreeNodeData>,
): void {
  const switchGroupNode: Node<SchemaTreeNodeData> = {
    id: node.id,
    visible: true,
    collapsible: true,
    collapsed: false,
    data: createSwitchGroupData(node.data),
    children: getSelectableChildren(node),
  };
  dispatch({
    type: "form-schema-tree__replace",
    payload: { path, node: switchGroupNode },
  });
}
