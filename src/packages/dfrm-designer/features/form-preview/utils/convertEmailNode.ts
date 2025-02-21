import type { CreateSchemaOptions } from "dfrm-schema";
import type { Meta, SchemaTreeEmailNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { TagMap } from "../../inspector";
import { createMeta } from "./createMeta";

export function convertEmailNode(
  tagMap: TagMap,
  node: Node<SchemaTreeEmailNodeData, SchemaTreeNodeData>,
): CreateSchemaOptions<Meta> {
  const { data } = node;
  const { id, tags, required, defaultValue } = data;
  const out: CreateSchemaOptions<Meta> = {
    type: "Email",
    meta: createMeta(tagMap, id, tags),
    required,
  };
  if (defaultValue !== "") {
    out.defaultValue = defaultValue;
  }
  return out;
}
