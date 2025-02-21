import { useSelector } from "react-redux";
import type { ComponentTreeConfigState } from "../component-tree-config";
import type { State } from "../root";

export function useComponentTreeConfigState(): ComponentTreeConfigState {
  return useSelector(selectComponentTreeConfigState);
}

function selectComponentTreeConfigState({ componentTreeConfig }: State): ComponentTreeConfigState {
  return componentTreeConfig;
}
