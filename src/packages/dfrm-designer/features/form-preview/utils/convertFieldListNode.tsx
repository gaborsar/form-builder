import type { CreateSchemaOptions } from "../../../../dfrm-schema";
import type { Meta, SchemaTreeFieldListNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { ComponentMap, TagMap } from "../../inspector";
import { convertNode } from "./convertNode";
import { createMeta } from "./createMeta";

export function convertFieldListNode(
  tagMap: TagMap,
  componentMap: ComponentMap,
  node: Node<SchemaTreeFieldListNodeData, SchemaTreeNodeData>,
): CreateSchemaOptions<Meta> | null {
  const { data, children } = node;
  const { id, tags, key, label, minLength, maxLength, unique } = data;
  const child = convertNode(tagMap, componentMap, children[0]);
  if (child === null) {
    return null;
  }
  const out: CreateSchemaOptions<Meta> = {
    type: "FieldList",
    meta: createMeta(tagMap, id, tags),
    key,
    label,
    child,
  };
  if (minLength !== null) {
    out.minLength = minLength;
  }
  if (maxLength !== null) {
    out.maxLength = maxLength;
  }
  if (unique) {
    out.unique = unique;
  }
  return out;
}
