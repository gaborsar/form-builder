import type { CreateSchemaOptions } from "../../../../dfrm-schema";
import type { Meta, SchemaTreeDateTimeNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { TagMap } from "../../inspector";
import { createMeta } from "./createMeta";

export function convertDateTimeNode(
  tagMap: TagMap,
  node: Node<SchemaTreeDateTimeNodeData, SchemaTreeNodeData>,
): CreateSchemaOptions<Meta> {
  const { data } = node;
  const { id, tags, required, defaultValue } = data;
  const out: CreateSchemaOptions<Meta> = {
    type: "DateTime",
    meta: createMeta(tagMap, id, tags),
    required,
  };
  if (defaultValue !== "") {
    out.defaultValue = defaultValue;
  }
  return out;
}
