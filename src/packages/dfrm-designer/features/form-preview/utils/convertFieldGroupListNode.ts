import type { CreateSchemaOptions } from "../../../../dfrm-schema";
import type { Meta, SchemaTreeFieldGroupListNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { ComponentMap, TagMap } from "../../inspector";
import { convertNode } from "./convertNode";
import { createMeta } from "./createMeta";
import { isNotNull } from "./isNotNull";

export function convertFieldGroupListNode(
  tagMap: TagMap,
  componentMap: ComponentMap,
  node: Node<SchemaTreeFieldGroupListNodeData, SchemaTreeNodeData>,
): CreateSchemaOptions<Meta> | null {
  const { data, children } = node;
  const { id, tags, key, label, minLength, maxLength } = data;
  const childrenOut: CreateSchemaOptions<Meta>[] = children
    .map((node) => convertNode(tagMap, componentMap, node))
    .filter(isNotNull);
  if (childrenOut.length === 0) {
    return null;
  }
  const out: CreateSchemaOptions<Meta> = {
    type: "FieldGroupList",
    meta: createMeta(tagMap, id, tags),
    key,
    label,
    children: childrenOut,
  };
  if (minLength !== null) {
    out.minLength = minLength;
  }
  if (maxLength !== null) {
    out.maxLength = maxLength;
  }
  return out;
}
