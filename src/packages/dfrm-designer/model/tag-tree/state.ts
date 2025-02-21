import type { ExplorerTreeState } from "../explorer-tree";

export type TagTreeState = ExplorerTreeState<TagTreeNodeData>;

export type TagTreeNodeData = TagTreeParentNodeData | TagTreeLeafNodeData;

export interface TagTreeParentNodeData {
  type: "Parent";
  name: string;
  label: { [locale: string]: string };
}

export interface TagTreeLeafNodeData {
  type: "Leaf";
  name: string;
  label: { [locale: string]: string };
  relations: TagTreeRelation[];
}

export interface TagTreeRelation {
  type: TagTreeRelationType | null;
  id: string;
}

export enum TagTreeRelationType {
  Synonym = "synonym",
}
