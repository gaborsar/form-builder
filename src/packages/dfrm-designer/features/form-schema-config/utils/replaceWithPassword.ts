import React from "react";
import type { FormSchemaTreeAction, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { createPasswordData } from "./createPasswordData";

export function replaceWithPassword(
  dispatch: React.Dispatch<FormSchemaTreeAction>,
  path: string[],
  { id, data }: Node<SchemaTreeNodeData>,
): void {
  const node: Node<SchemaTreeNodeData> = {
    id,
    visible: true,
    collapsible: false,
    collapsed: false,
    data: createPasswordData(data),
    children: [],
  };
  dispatch({
    type: "form-schema-tree__replace",
    payload: { path, node },
  });
}
