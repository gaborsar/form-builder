import React from "react";
import type { FormSchemaTreeAction, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";

export function replaceWithEmpty(
  dispatch: React.Dispatch<FormSchemaTreeAction>,
  path: string[],
  { id }: Node<SchemaTreeNodeData>,
): void {
  const node: Node<SchemaTreeNodeData> = {
    id,
    visible: true,
    collapsible: false,
    collapsed: false,
    data: { type: "Empty" },
    children: [],
  };
  dispatch({
    type: "form-schema-tree__replace",
    payload: { path, node },
  });
}
