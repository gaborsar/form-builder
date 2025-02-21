import type { CreateSchemaOptions } from "dfrm-schema";
import type { Meta, SchemaTreeConditionalNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { ComponentMap, TagMap } from "../../inspector";
import { convertNode } from "./convertNode";

export function convertConditionalNode(
  tagMap: TagMap,
  componentMap: ComponentMap,
  node: Node<SchemaTreeConditionalNodeData, SchemaTreeNodeData>,
): CreateSchemaOptions<Meta> | null {
  const { data, children } = node;
  const { template } = data;
  const $then = convertNode(tagMap, componentMap, children[0]);
  if ($then === null) {
    return null;
  }
  const out: CreateSchemaOptions<Meta> = {
    type: "Conditional",
    template,
    then: $then,
  };
  const $else = convertNode(tagMap, componentMap, children[1]);
  if ($else !== null) {
    out.else = $else;
  }
  return out;
}
