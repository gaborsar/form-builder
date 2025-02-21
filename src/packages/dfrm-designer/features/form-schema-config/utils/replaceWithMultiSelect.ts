import React from "react";
import type { FormSchemaTreeAction, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { createMultiSelectData } from "./createMultiSelectData";
import { getSelectableChildren } from "./getSelectableChildren";

export function replaceWithMultiSelect(
  dispatch: React.Dispatch<FormSchemaTreeAction>,
  path: string[],
  node: Node<SchemaTreeNodeData>,
): void {
  const { id, data } = node;
  const multiSelectNode: Node<SchemaTreeNodeData> = {
    id,
    visible: true,
    collapsible: true,
    collapsed: false,
    data: createMultiSelectData(data),
    children: getSelectableChildren(node),
  };
  dispatch({
    type: "form-schema-tree__replace",
    payload: { path, node: multiSelectNode },
  });
}
