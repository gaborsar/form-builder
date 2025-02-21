import type { CreateSchemaOptions } from "../../../../dfrm-schema";
import type { Meta, SchemaTreeDropdownNodeData, SchemaTreeOptionNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { TagMap } from "../../inspector";
import { convertOptionNode } from "./convertOptionNode";
import { createMeta } from "./createMeta";
import { getSingleChoiceDefaultValue } from "./getSingleChoiceDefaultValue";

export function convertDropdownNode(
  tagMap: TagMap,
  node: Node<SchemaTreeDropdownNodeData, SchemaTreeOptionNodeData>,
): CreateSchemaOptions<Meta> {
  const { data, children } = node;
  const { id, tags, required, defaultValue, transferOptionMetaToParent } = data;
  const out: CreateSchemaOptions<Meta> = {
    type: "Dropdown",
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
