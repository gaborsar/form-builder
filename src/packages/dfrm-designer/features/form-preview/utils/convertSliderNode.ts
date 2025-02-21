import type { CreateSchemaOptions } from "../../../../dfrm-schema";
import type { Meta, SchemaTreeOptionNodeData, SchemaTreeSliderNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { TagMap } from "../../inspector";
import { convertOptionNode } from "./convertOptionNode";
import { createMeta } from "./createMeta";
import { getSingleChoiceDefaultValue } from "./getSingleChoiceDefaultValue";

export function convertSliderNode(
  tagMap: TagMap,
  node: Node<SchemaTreeSliderNodeData, SchemaTreeOptionNodeData>,
): CreateSchemaOptions<Meta> {
  const { data, children } = node;
  const { id, tags, defaultValue, transferOptionMetaToParent } = data;
  const out: CreateSchemaOptions<Meta> = {
    type: "Slider",
    meta: createMeta(tagMap, id, tags),
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
