import { useSelector } from "react-redux";
import type { ComponentTreeState } from "../component-tree";
import type { State } from "../root";

export function useComponentTreeState(): ComponentTreeState {
  return useSelector(selectComponentTreeState);
}

function selectComponentTreeState({ value: { componentTree } }: State): ComponentTreeState {
  return componentTree;
}
