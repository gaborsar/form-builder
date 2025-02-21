import type { CreateSchemaOptions } from "../../../../dfrm-schema";
import type { Meta, SchemaTreeNodeData, SchemaTreeNumberNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { TagMap } from "../../inspector";
import { createMeta } from "./createMeta";

export function convertNumberNode(
  tagMap: TagMap,
  node: Node<SchemaTreeNumberNodeData, SchemaTreeNodeData>,
): CreateSchemaOptions<Meta> {
  const { data } = node;
  const {
    id,
    tags,
    required,
    defaultValue,
    precision,
    multipleOf,
    min,
    max,
    minExclusive,
    maxExclusive,
    unit,
  } = data;
  const out: CreateSchemaOptions<Meta> = {
    type: "Number",
    meta: createMeta(tagMap, id, tags),
    required,
    unit,
  };
  if (defaultValue !== null) {
    out.defaultValue = defaultValue;
  }
  if (precision !== null) {
    out.precision = precision;
  }
  if (multipleOf !== null) {
    out.multipleOf = multipleOf;
  }
  if (min !== null) {
    out.min = min;
  }
  if (max !== null) {
    out.max = max;
  }
  if (minExclusive !== null) {
    out.minExclusive = minExclusive;
  }
  if (maxExclusive !== null) {
    out.maxExclusive = maxExclusive;
  }
  return out;
}
