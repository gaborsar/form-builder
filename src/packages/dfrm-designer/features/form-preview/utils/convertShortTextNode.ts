import type { CreateSchemaOptions } from "../../../../dfrm-schema";
import type { Meta, SchemaTreeNodeData, SchemaTreeShortTextNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { TagMap } from "../../inspector";
import { createMeta } from "./createMeta";

export function convertShortTextNode(
  tagMap: TagMap,
  node: Node<SchemaTreeShortTextNodeData, SchemaTreeNodeData>,
): CreateSchemaOptions<Meta> {
  const { data } = node;
  const { id, tags, required, defaultValue, minLength, maxLength, pattern } = data;
  const out: CreateSchemaOptions<Meta> = {
    type: "ShortText",
    meta: createMeta(tagMap, id, tags),
    required,
  };
  if (defaultValue !== "") {
    out.defaultValue = defaultValue;
  }
  if (minLength !== null) {
    out.minLength = minLength;
  }
  if (maxLength !== null) {
    out.maxLength = maxLength;
  }
  if (pattern !== "") {
    out.pattern = pattern;
  }
  return out;
}
