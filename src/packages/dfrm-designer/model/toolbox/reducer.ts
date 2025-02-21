import type { ToolboxAction } from "./actions";
import type { ToolboxState } from "./state";

export function toolboxReducer(state: ToolboxState, action: ToolboxAction): ToolboxState {
  if (action.type === "toolbox__set-tab") {
    return { ...state, tab: action.payload.tab };
  }
  return state;
}
