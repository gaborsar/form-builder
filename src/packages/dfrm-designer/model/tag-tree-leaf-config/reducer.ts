import type { TagTreeLeafConfigAction } from "./actions";
import type { TagTreeLeafConfigState } from "./state";

export function tagTreeLeafConfigReducer(
  state: TagTreeLeafConfigState,
  action: TagTreeLeafConfigAction,
): TagTreeLeafConfigState {
  if (action.type === "tag-tree-leaf-config__set-tab") {
    return { ...state, tab: action.payload.tab };
  }
  return state;
}
