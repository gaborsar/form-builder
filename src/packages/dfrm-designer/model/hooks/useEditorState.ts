import { useSelector } from "react-redux";
import type { EditorState } from "../editor";
import type { State } from "../root";

export function useEditorState(): EditorState {
  return useSelector(selectEditorState);
}

function selectEditorState({ editor }: State): EditorState {
  return editor;
}
