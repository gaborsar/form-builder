import type { Node } from "../../utils/tree";

export interface ExplorerTreeSearchAction {
  payload: { query: string };
}

export interface ExplorerTreeSelectAction {
  payload: { path: string[] };
}

export interface ExplorerTreeAppendAction<Data> {
  payload: { path: string[]; node: Node<Data> };
}

export interface ExplorerTreeInsertBeforeAction<Data> {
  payload: { path: string[]; node: Node<Data> };
}

export interface ExplorerTreeInsertAfterAction<Data> {
  payload: { path: string[]; node: Node<Data> };
}

export interface ExplorerTreeReplaceAction<Data> {
  payload: { path: string[]; node: Node<Data> };
}

export interface ExplorerTreeRemoveAction {
  payload: { path: string[] };
}

export interface ExplorerTreeToggleAction {
  payload: { path: string[] };
}

export interface ExplorerTreeDuplicateAction {
  payload: { path: string[] };
}

export interface ExplorerTreeMoveUpAction {
  payload: { path: string[] };
}

export interface ExplorerTreeMoveDownAction {
  payload: { path: string[] };
}
