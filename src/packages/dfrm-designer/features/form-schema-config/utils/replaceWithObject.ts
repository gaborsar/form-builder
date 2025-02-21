import React from "react";
import type { FormSchemaTreeAction, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { createObjectData } from "./createObjectData";

export function replaceWithObject(
  dispatch: React.Dispatch<FormSchemaTreeAction>,
  path: string[],
  { id, data }: Node<SchemaTreeNodeData>,
): void {
  const node: Node<SchemaTreeNodeData> = {
    id,
    visible: true,
    collapsible: true,
    collapsed: false,
    data: createObjectData(data),
    children: [],
  };
  dispatch({
    type: "form-schema-tree__replace",
    payload: { path, node },
  });
}
