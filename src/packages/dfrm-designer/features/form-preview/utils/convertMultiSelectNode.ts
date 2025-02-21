import type { CreateSchemaOptions } from "../../../../dfrm-schema";
import type { Meta, SchemaTreeMultiSelectNodeData, SchemaTreeOptionNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { TagMap } from "../../inspector";
import { convertOptionNode } from "./convertOptionNode";
import { createMeta } from "./createMeta";
import { getMultiChoiceDefaultValue } from "./getMultiChoiceDefaultValue";

export function convertMultiSelectNode(
  tagMap: TagMap,
  node: Node<SchemaTreeMultiSelectNodeData, SchemaTreeOptionNodeData>,
): CreateSchemaOptions<Meta> {
  const { data, children } = node;
  const { id, tags, required, defaultValue } = data;
  const out: CreateSchemaOptions<Meta> = {
    type: "MultiSelect",
    meta: createMeta(tagMap, id, tags),
    required,
    options: children.map((child) => convertOptionNode(tagMap, child)),
  };
  if (defaultValue.length !== 0) {
    out.defaultValue = getMultiChoiceDefaultValue(tagMap, node.children, defaultValue);
  }
  return out;
}
