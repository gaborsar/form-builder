import type { TagTreeParentConfigAction } from "./actions";
import type { TagTreeParentConfigState } from "./state";

export function tagTreeParentConfigReducer(
  state: TagTreeParentConfigState,
  action: TagTreeParentConfigAction,
): TagTreeParentConfigState {
  if (action.type === "tag-tree-parent-config__set-tab") {
    return { ...state, tab: action.payload.tab };
  }
  return state;
}
