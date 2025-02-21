import {
  appendNode,
  collapseAll,
  duplicateNode,
  expandAll,
  insertNodeAfter,
  insertNodeBefore,
  moveNodeDown,
  moveNodeUp,
  removeNode,
  replaceNode,
  toggleNode,
} from "../../utils/tree";
import type {
  ExplorerTreeAppendAction,
  ExplorerTreeDuplicateAction,
  ExplorerTreeInsertAfterAction,
  ExplorerTreeInsertBeforeAction,
  ExplorerTreeMoveDownAction,
  ExplorerTreeMoveUpAction,
  ExplorerTreeRemoveAction,
  ExplorerTreeReplaceAction,
  ExplorerTreeSearchAction,
  ExplorerTreeSelectAction,
  ExplorerTreeToggleAction,
} from "./actions";
import type { ExplorerTreeState } from "./state";

export function handleExpandAll<Data, State extends ExplorerTreeState<Data>>(state: State): State {
  return { ...state, root: expandAll(state.root) };
}

export function handleCollapseAll<Data, State extends ExplorerTreeState<Data>>(
  state: State,
): State {
  return { ...state, root: collapseAll(state.root) };
}

export function handleSearch<Data, State extends ExplorerTreeState<Data>>(
  state: State,
  { payload: { query } }: ExplorerTreeSearchAction,
): State {
  return { ...state, query };
}

export function handleSelect<Data, State extends ExplorerTreeState<Data>>(
  state: State,
  { payload: { path } }: ExplorerTreeSelectAction,
): State {
  return { ...state, path };
}

export function handleAppend<Data, State extends ExplorerTreeState<Data>>(
  state: State,
  { payload: { path, node } }: ExplorerTreeAppendAction<Data>,
): State {
  return { ...state, root: appendNode(state.root, path, node) };
}

export function handleInsertBefore<Data, State extends ExplorerTreeState<Data>>(
  state: State,
  { payload: { path, node } }: ExplorerTreeInsertBeforeAction<Data>,
): State {
  return { ...state, root: insertNodeBefore(state.root, path, node) };
}

export function handleInsertAfter<Data, State extends ExplorerTreeState<Data>>(
  state: State,
  { payload: { path, node } }: ExplorerTreeInsertAfterAction<Data>,
): State {
  return { ...state, root: insertNodeAfter(state.root, path, node) };
}

export function handleReplace<Data, State extends ExplorerTreeState<Data>>(
  state: State,
  { payload: { path, node } }: ExplorerTreeReplaceAction<Data>,
): State {
  return { ...state, root: replaceNode(state.root, path, node) };
}

export function handleRemove<Data, State extends ExplorerTreeState<Data>>(
  state: State,
  { payload: { path } }: ExplorerTreeRemoveAction,
): State {
  return { ...state, root: removeNode(state.root, path) };
}

export function handleToggle<Data, State extends ExplorerTreeState<Data>>(
  state: State,
  { payload: { path } }: ExplorerTreeToggleAction,
): State {
  return { ...state, root: toggleNode(state.root, path) };
}

export function handleDuplicate<Data, State extends ExplorerTreeState<Data>>(
  state: State,
  { payload: { path } }: ExplorerTreeDuplicateAction,
): State {
  return { ...state, root: duplicateNode(state.root, path) };
}

export function handleMoveUp<Data, State extends ExplorerTreeState<Data>>(
  state: State,
  { payload: { path } }: ExplorerTreeMoveUpAction,
): State {
  return { ...state, root: moveNodeUp(state.root, path) };
}

export function handleMoveDown<Data, State extends ExplorerTreeState<Data>>(
  state: State,
  { payload: { path } }: ExplorerTreeMoveDownAction,
): State {
  return { ...state, root: moveNodeDown(state.root, path) };
}
