import { useSelector } from "react-redux";
import type { State } from "../root";
import type { TagTreeParentConfigState } from "../tag-tree-parent-config";

export function useTagTreeParentConfigState(): TagTreeParentConfigState {
  return useSelector(selectTagTreeParentConfigState);
}

function selectTagTreeParentConfigState({ tagTreeParentConfig }: State): TagTreeParentConfigState {
  return tagTreeParentConfig;
}
