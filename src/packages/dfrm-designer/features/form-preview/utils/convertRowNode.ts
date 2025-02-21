import type { CreateSchemaOptions } from "../../../../dfrm-schema";
import type { Meta, SchemaTreeNodeData, SchemaTreeRowNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { ComponentMap, TagMap } from "../../inspector";
import { convertNode } from "./convertNode";
import { isNotNull } from "./isNotNull";

export function convertRowNode(
  tagMap: TagMap,
  componentMap: ComponentMap,
  node: Node<SchemaTreeRowNodeData, SchemaTreeNodeData>,
): CreateSchemaOptions<Meta> | null {
  const { children } = node;
  const childrenOut = children
    .map((node) => convertNode(tagMap, componentMap, node))
    .filter(isNotNull);
  if (childrenOut.length === 0) {
    return null;
  }
  return { type: "Row", children: childrenOut };
}
