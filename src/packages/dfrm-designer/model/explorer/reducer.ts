import type { ExplorerAction } from "./actions";
import type { ExplorerState } from "./state";

export function explorerReducer(state: ExplorerState, action: ExplorerAction): ExplorerState {
  if (action.type === "explorer__set-tab") {
    return { ...state, tab: action.payload.tab };
  }
  return state;
}
