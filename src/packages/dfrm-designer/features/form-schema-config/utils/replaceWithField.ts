import React from "react";
import type { FormSchemaTreeAction, SchemaTreeNodeData } from "../../../model";
import { createId } from "../../../utils/id";
import type { Node } from "../../../utils/tree";
import { createFieldData } from "./createFieldData";

export function replaceWithField(
  dispatch: React.Dispatch<FormSchemaTreeAction>,
  path: string[],
  { id, data }: Node<SchemaTreeNodeData>,
): void {
  const node1: Node<SchemaTreeNodeData> = {
    id: createId(),
    visible: true,
    collapsible: false,
    collapsed: false,
    data: { type: "Empty" },
    children: [],
  };
  const node2: Node<SchemaTreeNodeData> = {
    id,
    visible: true,
    collapsible: true,
    collapsed: false,
    data: createFieldData(data),
    children: [node1],
  };
  dispatch({
    type: "form-schema-tree__replace",
    payload: { path, node: node2 },
  });
}
