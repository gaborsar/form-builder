import { useSelector } from "react-redux";
import type { State } from "../root";
import type { TagTreeState } from "../tag-tree";

export function useTagTreeState(): TagTreeState {
  return useSelector(selectTagTreeState);
}

function selectTagTreeState({ value: { tagTree } }: State): TagTreeState {
  return tagTree;
}
