import type { ComponentTreeConfigAction } from "./actions";
import type { ComponentTreeConfigState } from "./state";

export function componentTreeConfigReducer(
  state: ComponentTreeConfigState,
  action: ComponentTreeConfigAction,
): ComponentTreeConfigState {
  if (action.type === "component-tree-config__set-tab") {
    return { ...state, tab: action.payload.tab };
  }
  return state;
}
