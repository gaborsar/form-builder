import { useSelector } from "react-redux";
import type { ExplorerState } from "../explorer";
import type { State } from "../root";

export function useExplorerState(): ExplorerState {
  return useSelector(selectExplorerState);
}

function selectExplorerState({ explorer }: State): ExplorerState {
  return explorer;
}
