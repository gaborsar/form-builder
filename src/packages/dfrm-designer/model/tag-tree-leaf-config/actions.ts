import type { TagTreeLeafConfigTabId } from "./state";

export type TagTreeLeafConfigAction = TagTreeLeafConfigSetTabAction;

export interface TagTreeLeafConfigSetTabAction {
  type: "tag-tree-leaf-config__set-tab";
  payload: { tab: TagTreeLeafConfigTabId };
}
