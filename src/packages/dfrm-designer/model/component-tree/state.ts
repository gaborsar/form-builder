import type { ComponentSchemaTreeState } from "../component-schema-tree";
import type { ExplorerTreeState } from "../explorer-tree";

export type ComponentTreeState = ExplorerTreeState<ComponentTreeNodeData>;

export type ComponentTreeNodeData = ComponentTreeParentNodeData | ComponentTreeLeafNodeData;

export interface ComponentTreeParentNodeData {
  type: "Parent";
  name: string;
  label: { [locale: string]: string };
}

export interface ComponentTreeLeafNodeData {
  type: "Leaf";
  name: string;
  label: { [locale: string]: string };
  schemaTree: ComponentSchemaTreeState;
}
