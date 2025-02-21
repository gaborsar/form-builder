import type { Option } from "../../../../dfrm-schema";
import type { Meta, SchemaTreeNodeData, SchemaTreeOptionNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { TagMap } from "../../inspector";
import { createMeta } from "./createMeta";

export function convertOptionNode(
  tagMap: TagMap,
  node: Node<SchemaTreeOptionNodeData, SchemaTreeNodeData>,
): Option<Meta> {
  const { data } = node;
  const { id, tags } = data;
  return {
    meta: createMeta(tagMap, id, tags),
    value: getOptionValue(tagMap, node),
    label: getOptionLabel(tagMap, node),
  };
}

export function getOptionValue(
  tagMap: TagMap,
  node: Node<SchemaTreeOptionNodeData, SchemaTreeNodeData>,
): string {
  const { data } = node;
  const { id, value: directValue } = data;
  let value = "";
  if (id !== undefined && id in tagMap) {
    const { leaf: tag } = tagMap[id];
    const {
      data: { name: defaultValue },
    } = tag;
    if (defaultValue !== "") {
      value = defaultValue;
    }
  }
  if (directValue !== "") {
    value = directValue;
  }
  return value;
}

export function getOptionLabel(
  tagMap: TagMap,
  node: Node<SchemaTreeOptionNodeData, SchemaTreeNodeData>,
): { [key: string]: string } {
  const { data } = node;
  const { id, label: directLabel } = data;
  const label: { [key: string]: string } = {};
  if (id !== undefined && id in tagMap) {
    const { leaf: tag } = tagMap[id];
    const {
      data: { label: defaultLabel },
    } = tag;
    for (const [key, value] of Object.entries(defaultLabel)) {
      if (value !== "") {
        label[key] = value;
      }
    }
  }
  for (const [key, value] of Object.entries(directLabel)) {
    if (value !== "") {
      label[key] = value;
    }
  }
  return label;
}
