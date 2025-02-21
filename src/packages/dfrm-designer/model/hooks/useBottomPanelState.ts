import { useSelector } from "react-redux";
import type { BottomPanelState } from "../bottom-panel";
import type { State } from "../root";

export function useBottomPanelState(): BottomPanelState {
  return useSelector(selectBottomPanelState);
}

function selectBottomPanelState({ bottomPanel }: State): BottomPanelState {
  return bottomPanel;
}
