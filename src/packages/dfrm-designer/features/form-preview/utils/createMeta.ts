import type {
  Meta,
  MetaTag,
  TagTreeLeafNodeData,
  TagTreeParentNodeData,
  TagTreeRelationType,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import type { TagMap } from "../../inspector";

export function createMeta(
  tagMap: TagMap,
  id: string | undefined,
  tags: string[] | undefined,
): Meta {
  const idsOut: MetaTag[] = [];
  const tagsOut: MetaTag[] = [];
  if (id !== undefined) {
    if (id in tagMap) {
      const obj = tagMap[id];
      idsOut.push(createTag(obj, null));
      for (const { id, type } of obj.leaf.data.relations) {
        if (id in tagMap) {
          tagsOut.push(createTag(tagMap[id], type));
        }
      }
    }
  }
  if (tags !== undefined) {
    for (const id of tags) {
      if (id in tagMap) {
        const obj = tagMap[id];
        tagsOut.push(createTag(obj, null));
        for (const { id, type } of obj.leaf.data.relations) {
          if (id in tagMap) {
            tagsOut.push(createTag(tagMap[id], type));
          }
        }
      }
    }
  }
  const out: Meta = {};
  if (idsOut.length !== 0) {
    out.ids = idsOut;
  }
  if (tagsOut.length !== 0) {
    out.tags = tagsOut;
  }
  return out;
}

function createTag(
  {
    parent: {
      data: { name: vocab },
    },
    leaf: {
      data: { name: code, label: fsn },
    },
  }: {
    parent: Node<TagTreeParentNodeData>;
    leaf: Node<TagTreeLeafNodeData>;
  },
  source: TagTreeRelationType | null,
): MetaTag {
  const out: MetaTag = { vocab, code, fsn };
  if (source !== null) {
    out.source = source;
  }
  return out;
}
