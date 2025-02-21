import type { FormTreeConfigAction } from "./actions";
import type { FormTreeConfigState } from "./state";

export function formTreeConfigReducer(
  state: FormTreeConfigState,
  action: FormTreeConfigAction,
): FormTreeConfigState {
  if (action.type === "form-tree-config__set-tab") {
    return { ...state, tab: action.payload.tab };
  }
  return state;
}
