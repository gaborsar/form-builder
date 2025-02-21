import type { EditorTabType } from "./state";

export type EditorAction =
  | EditorSelectTabAction
  | EditorSelectPreviousAction
  | EditorSelectNextAction
  | EditorSelectMoveTabAction
  | EditorOpenTabAction
  | EditorCloseTabAction;

export interface EditorSelectTabAction {
  type: "editor__select-tab";
  payload: { index: number };
}

export interface EditorSelectPreviousAction {
  type: "editor__select-previous-tab";
}

export interface EditorSelectNextAction {
  type: "editor__select-next-tab";
}

export interface EditorSelectMoveTabAction {
  type: "editor__move-tab";
  payload: { source: number; target: number };
}

export interface EditorOpenTabAction {
  type: "editor__open-tab";
  payload: { type: EditorTabType; path: string[] };
}

export interface EditorCloseTabAction {
  type: "editor__close-tab";
  payload: { index: number } | { path: string[] };
}
