import type { CreateSchemaOptions } from "../../../../dfrm-schema";
import type { Meta, SchemaTreeNodeData, SchemaTreeSwitchNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { TagMap } from "../../inspector";
import { createMeta } from "./createMeta";

export function convertSwitchNode(
  tagMap: TagMap,
  node: Node<SchemaTreeSwitchNodeData, SchemaTreeNodeData>,
): CreateSchemaOptions<Meta> {
  const { data } = node;
  const { id, tags, defaultValue } = data;
  const out: CreateSchemaOptions<Meta> = {
    type: "Switch",
    meta: createMeta(tagMap, id, tags),
  };
  if (defaultValue) {
    out.defaultValue = defaultValue;
  }
  return out;
}
