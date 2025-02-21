import type { RightPanelAction } from "./actions";
import { emptyRightPanelState } from "./constants";
import type { RightPanelState } from "./state";

export function rightPanelReducer(
  state: RightPanelState,
  action: RightPanelAction,
): RightPanelState {
  if (action.type === "right-panel__reset") {
    return emptyRightPanelState;
  }
  if (action.type === "right-panel__toggle") {
    return { ...state, isOpen: !state.isOpen };
  }
  if (action.type === "right-panel__resize") {
    return { ...state, width: action.payload.width };
  }
  return state;
}
