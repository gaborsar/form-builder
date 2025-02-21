import type { LayoutAction } from "./actions";
import type { LayoutState } from "./state";

export function layoutReducer(state: LayoutState, action: LayoutAction): LayoutState {
  if (action.type === "layout__focus-on-element") {
    if (state.activeElement === action.payload.id) {
      return state;
    }
    return { ...state, activeElement: action.payload.id };
  }
  return state;
}
