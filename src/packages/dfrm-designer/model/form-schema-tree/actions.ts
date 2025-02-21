import type { Node } from "../../utils/tree";
import type { SchemaTreeNodeData } from "../schema-tree";

export type FormSchemaTreeAction =
  | FormSchemaTreeExpandAllAction
  | FormSchemaTreeCollapseAllAction
  | FormSchemaTreeSearchAction
  | FormSchemaTreeSelectAction
  | FormSchemaTreeAppendAction
  | FormSchemaTreeInsertBeforeAction
  | FormSchemaTreeInsertAfterAction
  | FormSchemaTreeReplaceAction
  | FormSchemaTreeRemoveAction
  | FormSchemaTreeToggleAction
  | FormSchemaTreeDuplicateAction
  | FormSchemaTreeMoveUpAction
  | FormSchemaTreeMoveDownAction;

export interface FormSchemaTreeExpandAllAction {
  type: "form-schema-tree__expand-all";
}

export interface FormSchemaTreeCollapseAllAction {
  type: "form-schema-tree__collapse-all";
}

export interface FormSchemaTreeSearchAction {
  type: "form-schema-tree__search";
  payload: { query: string };
}

export interface FormSchemaTreeSelectAction {
  type: "form-schema-tree__select";
  payload: { path: string[] };
}

export interface FormSchemaTreeAppendAction {
  type: "form-schema-tree__append";
  payload: { path: string[]; node: Node<SchemaTreeNodeData> };
}

export interface FormSchemaTreeInsertBeforeAction {
  type: "form-schema-tree__insert-before";
  payload: { path: string[]; node: Node<SchemaTreeNodeData> };
}

export interface FormSchemaTreeInsertAfterAction {
  type: "form-schema-tree__insert-after";
  payload: { path: string[]; node: Node<SchemaTreeNodeData> };
}

export interface FormSchemaTreeReplaceAction {
  type: "form-schema-tree__replace";
  payload: { path: string[]; node: Node<SchemaTreeNodeData> };
}

export interface FormSchemaTreeRemoveAction {
  type: "form-schema-tree__remove";
  payload: { path: string[] };
}

export interface FormSchemaTreeToggleAction {
  type: "form-schema-tree__toggle";
  payload: { path: string[] };
}

export interface FormSchemaTreeDuplicateAction {
  type: "form-schema-tree__duplicate";
  payload: { path: string[] };
}

export interface FormSchemaTreeMoveUpAction {
  type: "form-schema-tree__move-up";
  payload: { path: string[] };
}

export interface FormSchemaTreeMoveDownAction {
  type: "form-schema-tree__move-down";
  payload: { path: string[] };
}
