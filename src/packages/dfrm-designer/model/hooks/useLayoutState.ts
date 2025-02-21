import { useSelector } from "react-redux";
import type { LayoutState } from "../layout";
import type { State } from "../root";

export function useLayoutState(): LayoutState {
  return useSelector(selectLayoutState);
}

function selectLayoutState({ layout }: State): LayoutState {
  return layout;
}
