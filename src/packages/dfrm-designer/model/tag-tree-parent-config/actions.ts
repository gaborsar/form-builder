import type { TagTreeParentConfigTabId } from "./state";

export type TagTreeParentConfigAction = TagTreeParentConfigSetTabAction;

export interface TagTreeParentConfigSetTabAction {
  type: "tag-tree-parent-config__set-tab";
  payload: { tab: TagTreeParentConfigTabId };
}
