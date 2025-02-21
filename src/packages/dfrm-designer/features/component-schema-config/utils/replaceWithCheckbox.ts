import React from "react";
import type { ComponentSchemaTreeAction, ComponentSchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { createCheckboxData } from "./createCheckboxData";

export function replaceWithCheckbox(
  dispatch: React.Dispatch<ComponentSchemaTreeAction>,
  path: string[],
  { id, data }: Node<ComponentSchemaTreeNodeData>,
): void {
  const node: Node<ComponentSchemaTreeNodeData> = {
    id,
    visible: true,
    collapsible: false,
    collapsed: false,
    data: createCheckboxData(data),
    children: [],
  };
  dispatch({
    type: "component-schema-tree__replace",
    payload: { path, node },
  });
}
