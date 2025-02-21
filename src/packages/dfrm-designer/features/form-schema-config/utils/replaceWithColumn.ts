import React from "react";
import type { FormSchemaTreeAction, SchemaTreeNodeData } from "../../../model";
import { createId } from "../../../utils/id";
import type { Node } from "../../../utils/tree";

export function replaceWithColumn(
  dispatch: React.Dispatch<FormSchemaTreeAction>,
  path: string[],
  { id }: Node<SchemaTreeNodeData>,
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
    id: createId(),
    visible: true,
    collapsible: true,
    collapsed: false,
    data: {
      type: "Field",
      key: "",
      label: {},
    },
    children: [node1],
  };
  const node3: Node<SchemaTreeNodeData> = {
    id,
    visible: true,
    collapsible: true,
    collapsed: false,
    data: {
      type: "Column",
      width: 12,
      grow: false,
    },
    children: [node2],
  };
  dispatch({
    type: "form-schema-tree__replace",
    payload: { path, node: node3 },
  });
}
