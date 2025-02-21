import type { CreateSchemaOptions } from "dfrm-schema";
import type { Meta, SchemaTreeNodeData, SchemaTreeRemoteDropdownNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { TagMap } from "../../inspector";
import { createMeta } from "./createMeta";

export function convertRemoteDropdownNode(
  tagMap: TagMap,
  node: Node<SchemaTreeRemoteDropdownNodeData, SchemaTreeNodeData>,
): CreateSchemaOptions<Meta> {
  const { data } = node;
  const { id, tags, path, required } = data;
  const out: CreateSchemaOptions<Meta> = {
    type: "RemoteDropdown",
    path,
    meta: createMeta(tagMap, id, tags),
    required,
  };
  return out;
}
