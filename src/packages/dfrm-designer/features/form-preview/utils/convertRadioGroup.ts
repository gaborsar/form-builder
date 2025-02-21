import type { CreateSchemaOptions } from "dfrm-schema";
import type { Meta, SchemaTreeOptionNodeData, SchemaTreeRadioGroupNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { TagMap } from "../../inspector";
import { convertOptionNode } from "./convertOptionNode";
import { createMeta } from "./createMeta";
import { getSingleChoiceDefaultValue } from "./getSingleChoiceDefaultValue";

export function convertRadioGroupNode(
  tagMap: TagMap,
  node: Node<SchemaTreeRadioGroupNodeData, SchemaTreeOptionNodeData>,
): CreateSchemaOptions<Meta> {
  const { data, children } = node;
  const { id, tags, required, defaultValue, transferOptionMetaToParent, direction, columns } = data;
  const out: CreateSchemaOptions<Meta> = {
    type: "RadioGroup",
    meta: createMeta(tagMap, id, tags),
    required,
    direction,
    columns,
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
