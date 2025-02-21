import type { CreateSchemaOptions } from "../../../../dfrm-schema";
import type { Meta, SchemaTreeNodeData, SchemaTreeTimeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { TagMap } from "../../inspector";
import { createMeta } from "./createMeta";

export function convertTimeNode(
  tagMap: TagMap,
  node: Node<SchemaTreeTimeNodeData, SchemaTreeNodeData>,
): CreateSchemaOptions<Meta> {
  const { data } = node;
  const { id, tags, required, defaultValue } = data;
  const out: CreateSchemaOptions<Meta> = {
    type: "Time",
    meta: createMeta(tagMap, id, tags),
    required,
  };
  if (defaultValue !== "") {
    out.defaultValue = defaultValue;
  }
  return out;
}
