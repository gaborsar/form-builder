import { useSelector } from "react-redux";
import type { FormTreeConfigState } from "../form-tree-config";
import type { State } from "../root";

export function useFormTreeConfigState(): FormTreeConfigState {
  return useSelector(selectFormTreeConfigState);
}

function selectFormTreeConfigState({ formTreeConfig }: State): FormTreeConfigState {
  return formTreeConfig;
}
