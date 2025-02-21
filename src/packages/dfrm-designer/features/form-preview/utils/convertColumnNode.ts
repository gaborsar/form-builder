import type { CreateSchemaOptions } from "../../../../dfrm-schema";
import type { Meta, SchemaTreeColumnNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { ComponentMap, TagMap } from "../../inspector";
import { convertNode } from "./convertNode";

export function convertColumnNode(
  tagMap: TagMap,
  componentMap: ComponentMap,
  node: Node<SchemaTreeColumnNodeData, SchemaTreeNodeData>,
): CreateSchemaOptions<Meta> | null {
  const { data, children } = node;
  const { width, grow } = data;
  const child = convertNode(tagMap, componentMap, children[0]);
  if (child === null) {
    return null;
  }
  const out: CreateSchemaOptions<Meta> = {
    type: "Column",
    width,
    child,
  };
  if (grow) {
    out.grow = grow;
  }
  return out;
}
