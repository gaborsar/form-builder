import React from "react";
import type { FormSchemaTreeAction, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { createRemoteDropdownData } from "./createRemoteDropdownData";

export function replaceWithRemoteDropdown(
  dispatch: React.Dispatch<FormSchemaTreeAction>,
  path: string[],
  node: Node<SchemaTreeNodeData>,
): void {
  const { id, data } = node;
  const remoteDropdownNode: Node<SchemaTreeNodeData> = {
    id,
    visible: true,
    collapsible: false,
    collapsed: false,
    data: createRemoteDropdownData(data),
    children: [],
  };
  dispatch({
    type: "form-schema-tree__replace",
    payload: { path, node: remoteDropdownNode },
  });
}
