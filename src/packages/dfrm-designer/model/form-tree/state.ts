import type { ExplorerTreeState } from "../explorer-tree";
import type { FormSchemaTreeState } from "../form-schema-tree";

export type FormTreeState = ExplorerTreeState<FormTreeNodeData>;

export type FormTreeNodeData = FormTreeParentNodeData | FormTreeLeafNodeData;

export interface FormTreeParentNodeData {
  type: "Parent";
  name: string;
  label: { [locale: string]: string };
}

export interface FormTreeLeafNodeData {
  type: "Leaf";
  name: string;
  label: { [locale: string]: string };
  schemaTree: FormSchemaTreeState;
  previewState: FormPreviewState;
}

export interface FormPreviewState {
  optimizedValue: unknown;
  renderResult: unknown | null;
  flatResult: unknown | null;
}
