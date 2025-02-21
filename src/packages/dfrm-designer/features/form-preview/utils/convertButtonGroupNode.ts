import type { CreateSchemaOptions } from "dfrm-schema";
import type { Meta, SchemaTreeButtonGroupNodeData, SchemaTreeOptionNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { TagMap } from "../../inspector";
import { convertOptionNode } from "./convertOptionNode";
import { createMeta } from "./createMeta";
import { getSingleChoiceDefaultValue } from "./getSingleChoiceDefaultValue";

export function convertButtonGroupNode(
  tagMap: TagMap,
  node: Node<SchemaTreeButtonGroupNodeData, SchemaTreeOptionNodeData>,
): CreateSchemaOptions<Meta> {
  const { data, children } = node;
  const { id, tags, required, defaultValue, transferOptionMetaToParent } = data;
  const out: CreateSchemaOptions<Meta> = {
    type: "ButtonGroup",
    meta: createMeta(tagMap, id, tags),
    required,
    options: children.map((child) => convertOptionNode(tagMap, child)),
  };
  if (defaultValue !== "") {
    out.defaultValue = getSingleChoiceDefaultValue(tagMap, node.children, defaultValue);
  }
  if (transferOptionMetaToParent) {
    out.transferOptionMetaToParent = transferOptionMetaToParent;
  }
  return out;
}
