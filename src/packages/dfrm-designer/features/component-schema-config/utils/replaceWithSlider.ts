import React from "react";
import type { ComponentSchemaTreeAction, ComponentSchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { createSliderData } from "./createSliderData";
import { getSelectableChildren } from "./getSelectableChildren";

export function replaceWithSlider(
  dispatch: React.Dispatch<ComponentSchemaTreeAction>,
  path: string[],
  node: Node<ComponentSchemaTreeNodeData>,
): void {
  const { id, data } = node;
  const sliderNode: Node<ComponentSchemaTreeNodeData> = {
    id,
    visible: true,
    collapsible: true,
    collapsed: false,
    data: createSliderData(data),
    children: getSelectableChildren(node),
  };
  dispatch({
    type: "component-schema-tree__replace",
    payload: { path, node: sliderNode },
  });
}
