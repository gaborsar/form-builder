import React from "react";
import type { ComponentSchemaTreeAction, ComponentSchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { createEmailData } from "./createEmailData";

export function replaceWithEmail(
  dispatch: React.Dispatch<ComponentSchemaTreeAction>,
  path: string[],
  { id, data }: Node<ComponentSchemaTreeNodeData>,
): void {
  const node: Node<ComponentSchemaTreeNodeData> = {
    id,
    visible: true,
    collapsible: false,
    collapsed: false,
    data: createEmailData(data),
    children: [],
  };
  dispatch({
    type: "component-schema-tree__replace",
    payload: { path, node },
  });
}
