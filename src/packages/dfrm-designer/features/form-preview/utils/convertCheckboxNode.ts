import type { CreateSchemaOptions } from "../../../../dfrm-schema";
import type { Meta, SchemaTreeCheckboxNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { TagMap } from "../../inspector";
import { createMeta } from "./createMeta";

export function convertCheckboxNode(
  tagMap: TagMap,
  node: Node<SchemaTreeCheckboxNodeData, SchemaTreeNodeData>,
): CreateSchemaOptions<Meta> {
  const { data } = node;
  const { id, tags, defaultValue } = data;
  const out: CreateSchemaOptions<Meta> = {
    type: "Checkbox",
    meta: createMeta(tagMap, id, tags),
  };
  if (defaultValue) {
    out.defaultValue = defaultValue;
  }
  return out;
}
