import type { CreateSchemaOptions } from "dfrm-schema";
import type { Meta, SchemaTreeComponentNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { ComponentMap, TagMap } from "../../inspector";
import { convertNode } from "./convertNode";
import { createMeta } from "./createMeta";

export function convertComponentNode(
  tagMap: TagMap,
  componentMap: ComponentMap,
  node: Node<SchemaTreeComponentNodeData, SchemaTreeNodeData>,
): CreateSchemaOptions<Meta> | null {
  const out = convertNode(
    tagMap,
    componentMap,
    componentMap[node.data.component].data.schemaTree.root,
  );

  if (out === null) {
    return out;
  }

  if (!("meta" in out)) {
    return out;
  }

  const { data } = node;
  const { id, tags } = data;

  const componentMeta = createMeta(tagMap, id, tags);

  return out.meta === undefined
    ? { ...out, meta: componentMeta }
    : { ...out, meta: mergeMetaData(out.meta, componentMeta) };
}

function mergeMetaData(a: Meta, b: Meta): Meta {
  const c: Meta = { ...a };

  if (a.ids !== undefined && b.ids !== undefined) {
    c.ids = a.ids.concat(b.ids);
  } else if (a.ids !== undefined) {
    c.ids = a.ids;
  } else if (b.ids !== undefined) {
    c.ids = b.ids;
  }

  if (a.tags !== undefined && b.tags !== undefined) {
    c.tags = a.tags.concat(b.tags);
  } else if (a.tags !== undefined) {
    c.tags = a.tags;
  } else if (b.tags !== undefined) {
    c.tags = b.tags;
  }

  return c;
}
