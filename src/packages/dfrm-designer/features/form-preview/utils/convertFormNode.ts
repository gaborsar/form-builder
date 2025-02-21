import type { CreateSchemaOptions } from "../../../../dfrm-schema";
import type { Meta, SchemaTreeFormNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { ComponentMap, TagMap } from "../../inspector";
import { convertNode } from "./convertNode";
import { createMeta } from "./createMeta";
import { isNotNull } from "./isNotNull";

export function convertFormNode(
  tagMap: TagMap,
  componentMap: ComponentMap,
  node: Node<SchemaTreeFormNodeData, SchemaTreeNodeData>,
): CreateSchemaOptions<Meta> | null {
  const { data, children } = node;
  const { id, tags } = data;
  const childrenOut = children
    .map((node) => convertNode(tagMap, componentMap, node))
    .filter(isNotNull);
  return {
    type: "Form",
    meta: createMeta(tagMap, id, tags),
    children: childrenOut,
  };
}
