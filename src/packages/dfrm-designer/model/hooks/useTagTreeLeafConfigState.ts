import { useSelector } from "react-redux";
import type { State } from "../root";
import type { TagTreeLeafConfigState } from "../tag-tree-leaf-config";

export function useTagTreeLeafConfigState(): TagTreeLeafConfigState {
  return useSelector(selectTagTreeLeafConfigState);
}

function selectTagTreeLeafConfigState({ tagTreeLeafConfig }: State): TagTreeLeafConfigState {
  return tagTreeLeafConfig;
}
