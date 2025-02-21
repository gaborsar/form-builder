import type { SchemaTreeConfigTabId } from "./state";

export type SchemaTreeConfigAction = SchemaTreeConfigSetTabAction;

export interface SchemaTreeConfigSetTabAction {
  type: "schema-tree-config__set-tab";
  payload: { tab: SchemaTreeConfigTabId };
}
