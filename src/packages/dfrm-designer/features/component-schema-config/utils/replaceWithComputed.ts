import React from "react";
import type { ComponentSchemaTreeAction, ComponentSchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { createComputedData } from "./createComputedData";

export function replaceWithComputed(
  dispatch: React.Dispatch<ComponentSchemaTreeAction>,
  path: string[],
  { id, data }: Node<ComponentSchemaTreeNodeData>,
): void {
  const node: Node<ComponentSchemaTreeNodeData> = {
    id,
    visible: true,
    collapsible: false,
    collapsed: false,
    data: createComputedData(data),
    children: [],
  };
  dispatch({
    type: "component-schema-tree__replace",
    payload: { path, node },
  });
}
