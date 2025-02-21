import { useSelector } from "react-redux";
import type { LeftPanelState } from "../left-panel";
import type { State } from "../root";

export function useLeftPanelState(): LeftPanelState {
  return useSelector(selectLeftPanelState);
}

function selectLeftPanelState({ leftPanel }: State): LeftPanelState {
  return leftPanel;
}
