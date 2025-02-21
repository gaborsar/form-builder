import { useSelector } from "react-redux";
import type { State } from "../root";
import type { ToolboxState } from "../toolbox";

export function useToolboxState(): ToolboxState {
  return useSelector(selectToolboxState);
}

function selectToolboxState({ toolbox }: State): ToolboxState {
  return toolbox;
}
