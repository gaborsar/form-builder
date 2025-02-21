import { useSelector } from "react-redux";
import type { FormTreeState } from "../form-tree";
import type { State } from "../root";

export function useFormTreeState(): FormTreeState {
  return useSelector(selectFormTreeState);
}

function selectFormTreeState({ value: { formTree } }: State): FormTreeState {
  return formTree;
}
