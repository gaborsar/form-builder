import type { LeftPanelAction } from "./actions";
import { emptyLeftPanelState } from "./constants";
import type { LeftPanelState } from "./state";

export function leftPanelReducer(state: LeftPanelState, action: LeftPanelAction): LeftPanelState {
  if (action.type === "left-panel__reset") {
    return emptyLeftPanelState;
  }
  if (action.type === "left-panel__toggle") {
    return { ...state, isOpen: !state.isOpen };
  }
  if (action.type === "left-panel__resize") {
    return { ...state, width: action.payload.width };
  }
  return state;
}
