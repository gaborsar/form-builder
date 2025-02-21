import { useSelector } from "react-redux";
import type { EditStackItem } from "../edit-stack";
import type { State } from "../root";

export function useRedoStack(): EditStackItem[] {
  return useSelector(selectRedoStack);
}

function selectRedoStack({ redo }: State): EditStackItem[] {
  return redo;
}
