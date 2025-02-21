import { useSelector } from "react-redux";
import type { RightPanelState } from "../right-panel";
import type { State } from "../root";

export function useRightPanelState(): RightPanelState {
  return useSelector(selectRightPanelState);
}

function selectRightPanelState({ rightPanel }: State): RightPanelState {
  return rightPanel;
}
