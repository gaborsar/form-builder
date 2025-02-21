import type { CreateSchemaOptions } from "dfrm-schema";
import type { Meta, SchemaTreeNodeData, SchemaTreeObjectNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { ComponentMap, TagMap } from "../../inspector";
import { convertNode } from "./convertNode";
import { createMeta } from "./createMeta";
import { isNotNull } from "./isNotNull";

export function convertObjectNode(
  tagMap: TagMap,
  componentMap: ComponentMap,
  node: Node<SchemaTreeObjectNodeData, SchemaTreeNodeData>,
): CreateSchemaOptions<Meta> | null {
  const { data, children } = node;
  const { id, tags, key } = data;
  const childrenOut = children
    .map((node) => convertNode(tagMap, componentMap, node))
    .filter(isNotNull);
  if (childrenOut.length === 0) {
    return null;
  }
  return {
    type: "Object",
    meta: createMeta(tagMap, id, tags),
    key,
    children: childrenOut,
  };
}
