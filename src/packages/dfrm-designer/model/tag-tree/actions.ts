export type TagTreeAction =
  | TagTreeExpandAllAction
  | TagTreeCollapseAllAction
  | TagTreeSearchAction
  | TagTreeSelectAction
  | TagTreeAppendAction
  | TagTreeInsertBeforeAction
  | TagTreeInsertAfterAction
  | TagTreeReplaceAction
  | TagTreeRemoveAction
  | TagTreeToggleAction
  | TagTreeDuplicateAction
  | TagTreeMoveUpAction
  | TagTreeMoveDownAction
  | TagTreeRemoveTagReferencesAction;
import type { Node } from "../../utils/tree";
import type { TagTreeNodeData } from "./state";

export interface TagTreeExpandAllAction {
  type: "tag-tree__expand-all";
}

export interface TagTreeCollapseAllAction {
  type: "tag-tree__collapse-all";
}

export interface TagTreeSearchAction {
  type: "tag-tree__search";
  payload: { query: string };
}

export interface TagTreeSelectAction {
  type: "tag-tree__select";
  payload: { path: string[] };
}

export interface TagTreeAppendAction {
  type: "tag-tree__append";
  payload: { path: string[]; node: Node<TagTreeNodeData> };
}

export interface TagTreeInsertBeforeAction {
  type: "tag-tree__insert-before";
  payload: { path: string[]; node: Node<TagTreeNodeData> };
}

export interface TagTreeInsertAfterAction {
  type: "tag-tree__insert-after";
  payload: { path: string[]; node: Node<TagTreeNodeData> };
}

export interface TagTreeReplaceAction {
  type: "tag-tree__replace";
  payload: { path: string[]; node: Node<TagTreeNodeData> };
}

export interface TagTreeRemoveAction {
  type: "tag-tree__remove";
  payload: { path: string[] };
}

export interface TagTreeToggleAction {
  type: "tag-tree__toggle";
  payload: { path: string[] };
}

export interface TagTreeDuplicateAction {
  type: "tag-tree__duplicate";
  payload: { path: string[] };
}

export interface TagTreeMoveUpAction {
  type: "tag-tree__move-up";
  payload: { path: string[] };
}

export interface TagTreeMoveDownAction {
  type: "tag-tree__move-down";
  payload: { path: string[] };
}

export interface TagTreeRemoveTagReferencesAction {
  type: "tag-tree__remove-tag-references";
  payload: { ids: string[] };
}
