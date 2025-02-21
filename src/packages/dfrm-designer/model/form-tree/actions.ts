export type FormTreeAction =
  | FormTreeExpandAllAction
  | FormTreeCollapseAllAction
  | FormTreeSearchAction
  | FormTreeSelectAction
  | FormTreeAppendAction
  | FormTreeInsertBeforeAction
  | FormTreeInsertAfterAction
  | FormTreeReplaceAction
  | FormTreeRemoveAction
  | FormTreeToggleAction
  | FormTreeDuplicateAction
  | FormTreeMoveUpAction
  | FormTreeMoveDownAction
  | FormTreeUpdatePreviewState
  | FormTreeRemoveTagReferencesAction
  | FormTreeRemoveComponentReferencesAction;
import type { Node } from "../../utils/tree";
import type { FormPreviewState, FormTreeNodeData } from "./state";

export interface FormTreeExpandAllAction {
  type: "form-tree__expand-all";
}

export interface FormTreeCollapseAllAction {
  type: "form-tree__collapse-all";
}

export interface FormTreeSearchAction {
  type: "form-tree__search";
  payload: { query: string };
}

export interface FormTreeSelectAction {
  type: "form-tree__select";
  payload: { path: string[] };
}

export interface FormTreeAppendAction {
  type: "form-tree__append";
  payload: { path: string[]; node: Node<FormTreeNodeData> };
}

export interface FormTreeInsertBeforeAction {
  type: "form-tree__insert-before";
  payload: { path: string[]; node: Node<FormTreeNodeData> };
}

export interface FormTreeInsertAfterAction {
  type: "form-tree__insert-after";
  payload: { path: string[]; node: Node<FormTreeNodeData> };
}

export interface FormTreeReplaceAction {
  type: "form-tree__replace";
  payload: { path: string[]; node: Node<FormTreeNodeData> };
}

export interface FormTreeRemoveAction {
  type: "form-tree__remove";
  payload: { path: string[] };
}

export interface FormTreeToggleAction {
  type: "form-tree__toggle";
  payload: { path: string[] };
}

export interface FormTreeDuplicateAction {
  type: "form-tree__duplicate";
  payload: { path: string[] };
}

export interface FormTreeMoveUpAction {
  type: "form-tree__move-up";
  payload: { path: string[] };
}

export interface FormTreeMoveDownAction {
  type: "form-tree__move-down";
  payload: { path: string[] };
}

export interface FormTreeUpdatePreviewState {
  type: "form-tree__update-preview-state";
  payload: { path: string[]; previewState: FormPreviewState };
}

export interface FormTreeRemoveTagReferencesAction {
  type: "form-tree__remove-tag-references";
  payload: { ids: string[] };
}

export interface FormTreeRemoveComponentReferencesAction {
  type: "form-tree__remove-component-references";
  payload: { ids: string[] };
}
