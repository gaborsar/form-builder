import React from "react";
import type { FormSchemaTreeAction, SchemaTreeNodeData } from "../../../model";
import { createId } from "../../../utils/id";
import type { Node } from "../../../utils/tree";

export function wrapWithConditional(
  dispatch: React.Dispatch<FormSchemaTreeAction>,
  path: string[],
  node: Node<SchemaTreeNodeData>,
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
      type: "Conditional",
      template: "",
    },
    children: [node, node1],
  };
  dispatch({
    type: "form-schema-tree__replace",
    payload: { path, node: node2 },
  });
  dispatch({
    type: "form-schema-tree__select",
    payload: { path: path.slice(0, -1).concat(node2.id) },
  });
}
