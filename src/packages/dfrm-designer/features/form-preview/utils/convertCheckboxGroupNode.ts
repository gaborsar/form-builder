import type { CreateSchemaOptions } from "../../../../dfrm-schema";
import type {
  Meta,
  SchemaTreeCheckboxGroupNodeData,
  SchemaTreeOptionNodeData,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import type { TagMap } from "../../inspector";
import { convertOptionNode } from "./convertOptionNode";
import { createMeta } from "./createMeta";
import { getMultiChoiceDefaultValue } from "./getMultiChoiceDefaultValue";

export function convertCheckboxGroupNode(
  tagMap: TagMap,
  node: Node<SchemaTreeCheckboxGroupNodeData, SchemaTreeOptionNodeData>,
): CreateSchemaOptions<Meta> {
  const { data, children } = node;
  const { id, tags, required, defaultValue, direction, columns } = data;
  const out: CreateSchemaOptions<Meta> = {
    type: "CheckboxGroup",
    meta: createMeta(tagMap, id, tags),
    required,
    direction,
    columns,
    options: children.map((child) => convertOptionNode(tagMap, child)),
  };
  if (defaultValue.length !== 0) {
    out.defaultValue = getMultiChoiceDefaultValue(tagMap, node.children, defaultValue);
  }
  return out;
}
