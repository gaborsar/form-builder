import type { Node } from "../../utils/tree";
import type { SchemaTreeNodeData } from "../schema-tree";

export type ComponentSchemaTreeAction =
  | ComponentSchemaTreeExpandAllAction
  | ComponentSchemaTreeCollapseAllAction
  | ComponentSchemaTreeSearchAction
  | ComponentSchemaTreeSelectAction
  | ComponentSchemaTreeAppendAction
  | ComponentSchemaTreeInsertBeforeAction
  | ComponentSchemaTreeInsertAfterAction
  | ComponentSchemaTreeReplaceAction
  | ComponentSchemaTreeRemoveAction
  | ComponentSchemaTreeToggleAction
  | ComponentSchemaTreeDuplicateAction
  | ComponentSchemaTreeMoveUpAction
  | ComponentSchemaTreeMoveDownAction;

export interface ComponentSchemaTreeExpandAllAction {
  type: "component-schema-tree__expand-all";
}

export interface ComponentSchemaTreeCollapseAllAction {
  type: "component-schema-tree__collapse-all";
}

export interface ComponentSchemaTreeSearchAction {
  type: "component-schema-tree__search";
  payload: { query: string };
}

export interface ComponentSchemaTreeSelectAction {
  type: "component-schema-tree__select";
  payload: { path: string[] };
}

export interface ComponentSchemaTreeAppendAction {
  type: "component-schema-tree__append";
  payload: { path: string[]; node: Node<SchemaTreeNodeData> };
}

export interface ComponentSchemaTreeInsertBeforeAction {
  type: "component-schema-tree__insert-before";
  payload: { path: string[]; node: Node<SchemaTreeNodeData> };
}

export interface ComponentSchemaTreeInsertAfterAction {
  type: "component-schema-tree__insert-after";
  payload: { path: string[]; node: Node<SchemaTreeNodeData> };
}

export interface ComponentSchemaTreeReplaceAction {
  type: "component-schema-tree__replace";
  payload: { path: string[]; node: Node<SchemaTreeNodeData> };
}

export interface ComponentSchemaTreeRemoveAction {
  type: "component-schema-tree__remove";
  payload: { path: string[] };
}

export interface ComponentSchemaTreeToggleAction {
  type: "component-schema-tree__toggle";
  payload: { path: string[] };
}

export interface ComponentSchemaTreeDuplicateAction {
  type: "component-schema-tree__duplicate";
  payload: { path: string[] };
}

export interface ComponentSchemaTreeMoveUpAction {
  type: "component-schema-tree__move-up";
  payload: { path: string[] };
}

export interface ComponentSchemaTreeMoveDownAction {
  type: "component-schema-tree__move-down";
  payload: { path: string[] };
}
