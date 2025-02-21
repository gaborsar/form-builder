import type { BottomPanelAction } from "./actions";
import { emptyBottomPanelState } from "./constants";
import type { BottomPanelState } from "./state";

export function bottomPanelReducer(
  state: BottomPanelState,
  action: BottomPanelAction,
): BottomPanelState {
  if (action.type === "bottom-panel__reset") {
    return emptyBottomPanelState;
  }
  if (action.type === "bottom-panel__toggle") {
    return { ...state, isOpen: !state.isOpen };
  }
  if (action.type === "bottom-panel__resize") {
    return { ...state, height: action.payload.height };
  }
  return state;
}
