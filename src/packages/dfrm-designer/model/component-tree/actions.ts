export type ComponentTreeAction =
  | ComponentTreeExpandAllAction
  | ComponentTreeCollapseAllAction
  | ComponentTreeSearchAction
  | ComponentTreeSelectAction
  | ComponentTreeAppendAction
  | ComponentTreeInsertBeforeAction
  | ComponentTreeInsertAfterAction
  | ComponentTreeReplaceAction
  | ComponentTreeRemoveAction
  | ComponentTreeToggleAction
  | ComponentTreeDuplicateAction
  | ComponentTreeMoveUpAction
  | ComponentTreeMoveDownAction
  | ComponentTreeRemoveTagReferencesAction;
import type { Node } from "../../utils/tree";
import type { ComponentTreeNodeData } from "./state";

export interface ComponentTreeExpandAllAction {
  type: "component-tree__expand-all";
}

export interface ComponentTreeCollapseAllAction {
  type: "component-tree__collapse-all";
}

export interface ComponentTreeSearchAction {
  type: "component-tree__search";
  payload: { query: string };
}

export interface ComponentTreeSelectAction {
  type: "component-tree__select";
  payload: { path: string[] };
}

export interface ComponentTreeAppendAction {
  type: "component-tree__append";
  payload: { path: string[]; node: Node<ComponentTreeNodeData> };
}

export interface ComponentTreeInsertBeforeAction {
  type: "component-tree__insert-before";
  payload: { path: string[]; node: Node<ComponentTreeNodeData> };
}

export interface ComponentTreeInsertAfterAction {
  type: "component-tree__insert-after";
  payload: { path: string[]; node: Node<ComponentTreeNodeData> };
}

export interface ComponentTreeReplaceAction {
  type: "component-tree__replace";
  payload: { path: string[]; node: Node<ComponentTreeNodeData> };
}

export interface ComponentTreeRemoveAction {
  type: "component-tree__remove";
  payload: { path: string[] };
}

export interface ComponentTreeToggleAction {
  type: "component-tree__toggle";
  payload: { path: string[] };
}

export interface ComponentTreeDuplicateAction {
  type: "component-tree__duplicate";
  payload: { path: string[] };
}

export interface ComponentTreeMoveUpAction {
  type: "component-tree__move-up";
  payload: { path: string[] };
}

export interface ComponentTreeMoveDownAction {
  type: "component-tree__move-down";
  payload: { path: string[] };
}

export interface ComponentTreeRemoveTagReferencesAction {
  type: "component-tree__remove-tag-references";
  payload: { ids: string[] };
}
