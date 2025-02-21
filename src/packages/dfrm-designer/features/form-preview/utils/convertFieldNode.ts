import type { CreateSchemaOptions } from "dfrm-schema";
import type { Meta, SchemaTreeFieldNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { ComponentMap, TagMap } from "../../inspector";
import { convertNode } from "./convertNode";
import { createMeta } from "./createMeta";

export function convertFieldNode(
  tagMap: TagMap,
  componentMap: ComponentMap,
  node: Node<SchemaTreeFieldNodeData, SchemaTreeNodeData>,
): CreateSchemaOptions<Meta> | null {
  const { data, children } = node;
  const { id, tags, key, label } = data;
  const child = convertNode(tagMap, componentMap, children[0]);
  if (child === null) {
    return null;
  }
  return {
    type: "Field",
    meta: createMeta(tagMap, id, tags),
    key,
    label,
    child,
  };
}
