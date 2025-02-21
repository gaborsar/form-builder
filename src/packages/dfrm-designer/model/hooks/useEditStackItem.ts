import { useSelector } from "react-redux";
import type { EditStackItem } from "../edit-stack";
import type { State } from "../root";

export function useEditStackItem(): EditStackItem {
  return useSelector(selectEditStackItem);
}

function selectEditStackItem({ value }: State): EditStackItem {
  return value;
}
