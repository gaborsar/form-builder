import React from "react";
import type { FormSchemaTreeAction, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { createSliderData } from "./createSliderData";
import { getSelectableChildren } from "./getSelectableChildren";

export function replaceWithSlider(
  dispatch: React.Dispatch<FormSchemaTreeAction>,
  path: string[],
  node: Node<SchemaTreeNodeData>,
): void {
  const { id, data } = node;
  const sliderNode: Node<SchemaTreeNodeData> = {
    id,
    visible: true,
    collapsible: true,
    collapsed: false,
    data: createSliderData(data),
    children: getSelectableChildren(node),
  };
  dispatch({
    type: "form-schema-tree__replace",
    payload: { path, node: sliderNode },
  });
}
