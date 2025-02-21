import { useSelector } from "react-redux";
import type { EditStackItem } from "../edit-stack";
import type { State } from "../root";

export function useUndoStack(): EditStackItem[] {
  return useSelector(selectUndoStack);
}

function selectUndoStack({ undo }: State): EditStackItem[] {
  return undo;
}
