import React from "react";
import type { FormSchemaTreeAction, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { createDateTimeData } from "./createDateTimeData";

export function replaceWithDateTime(
  dispatch: React.Dispatch<FormSchemaTreeAction>,
  path: string[],
  { id, data }: Node<SchemaTreeNodeData>,
): void {
  const node: Node<SchemaTreeNodeData> = {
    id,
    visible: true,
    collapsible: false,
    collapsed: false,
    data: createDateTimeData(data),
    children: [],
  };
  dispatch({
    type: "form-schema-tree__replace",
    payload: { path, node },
  });
}
