import type { CreateSchemaOptions } from "dfrm-schema";
import type { Meta, SchemaTreeFieldsetNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { ComponentMap, TagMap } from "../../inspector";
import { convertNode } from "./convertNode";
import { isNotNull } from "./isNotNull";

export function convertFieldsetNode(
  tagMap: TagMap,
  componentMap: ComponentMap,
  node: Node<SchemaTreeFieldsetNodeData, SchemaTreeNodeData>,
): CreateSchemaOptions<Meta> | null {
  const { data, children } = node;
  const { label } = data;
  const childrenOut = children
    .map((node) => convertNode(tagMap, componentMap, node))
    .filter(isNotNull);
  if (childrenOut.length === 0) {
    return null;
  }
  return { type: "Fieldset", label, children: childrenOut };
}
