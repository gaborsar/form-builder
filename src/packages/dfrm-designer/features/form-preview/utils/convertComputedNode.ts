import type { CreateSchemaOptions } from "dfrm-schema";
import type { Meta, SchemaTreeComputedNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { TagMap } from "../../inspector";
import { createMeta } from "./createMeta";

export function convertComputedNode(
  tagMap: TagMap,
  node: Node<SchemaTreeComputedNodeData, SchemaTreeNodeData>,
): CreateSchemaOptions<Meta> {
  const { data } = node;
  const { id, tags, template, unit } = data;
  return {
    type: "Computed",
    meta: createMeta(tagMap, id, tags),
    template,
    unit,
  };
}
