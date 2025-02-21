import React from "react";
import type { FormSchemaTreeAction, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";

export function replaceWithComponent(
  dispatch: React.Dispatch<FormSchemaTreeAction>,
  path: string[],
  node: Node<SchemaTreeNodeData>,
  component: string,
): void {
  const componentNode: Node<SchemaTreeNodeData> = {
    id: node.id,
    visible: true,
    collapsible: false,
    collapsed: false,
    data: {
      type: "Component",
      component,
    },
    children: [],
  };
  dispatch({
    type: "form-schema-tree__replace",
    payload: { path, node: componentNode },
  });
}
