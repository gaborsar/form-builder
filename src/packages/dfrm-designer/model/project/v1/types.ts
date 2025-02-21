export interface ExternalProject {
  version: 1;
  tagTree: ExternalTagTreeState;
  formTree: ExternalFormTreeState;
  componentTree: ExternalComponentTreeState;
}

export interface ExternalTagTreeState {
  root: ExternalTagTreeNode;
}

export interface ExternalFormTreeState {
  root: ExternalFormTreeNode;
}

export interface ExternalComponentTreeState {
  root: ExternalComponentTreeNode;
}

export interface ExternalTagTreeNode {
  id: string;
  data: ExternalTagTreeNodeData;
  children?: ExternalTagTreeNode[];
}

export type ExternalTagTreeNodeData = ExternalTagTreeParentNodeData | ExternalTagTreeLeafNodeData;

export interface ExternalTagTreeParentNodeData {
  type: "Parent";
  name: string;
  label: { [locale: string]: string };
}

export interface ExternalTagTreeLeafNodeData {
  type: "Leaf";
  name: string;
  label: { [locale: string]: string };
  relations: ExternalTagTreeRelation[];
}

export interface ExternalTagTreeRelation {
  type: ExternalTagTreeRelationType | null;
  id: string;
}

export enum ExternalTagTreeRelationType {
  Synonym = "synonym",
}

export interface ExternalFormTreeNode {
  id: string;
  data: ExternalFormTreeNodeData;
  children?: ExternalFormTreeNode[];
}

export type ExternalFormTreeNodeData =
  | ExternalFormTreeParentNodeData
  | ExternalFormTreeLeafNodeData;

export interface ExternalFormTreeParentNodeData {
  type: "Parent";
  name: string;
  label: { [locale: string]: string };
}

export interface ExternalFormTreeLeafNodeData {
  type: "Leaf";
  name: string;
  label: { [locale: string]: string };
  schemaTree: ExternalFormSchemaTreeState;
  previewState: ExternalFormPreviewState;
}

export interface ExternalFormPreviewState {
  optimizedValue: unknown;
  renderResult: unknown;
  flatResult: unknown;
}

export interface ExternalFormSchemaTreeState {
  root: ExternalFormSchemaTreeNode;
}

export interface ExternalFormSchemaTreeNode {
  id: string;
  data: ExternalFormSchemaTreeNodeData;
  children?: ExternalFormSchemaTreeNode[];
}

export type ExternalFormSchemaTreeNodeData =
  | ExternalConditionalNodeData
  | ExternalFormNodeData
  | ExternalFieldsetNodeData
  | ExternalRowNodeData
  | ExternalColumnNodeData
  | ExternalObjectNodeData
  | ExternalFieldGroupListNodeData
  | ExternalFieldListNodeData
  | ExternalFieldNodeData
  | ExternalRemoteDropdownNodeData
  | ExternalDropdownNodeData
  | ExternalButtonGroupNodeData
  | ExternalRadioGroupNodeData
  | ExternalSliderNodeData
  | ExternalMultiSelectNodeData
  | ExternalCheckboxGroupNodeData
  | ExternalSwitchGroupNodeData
  | ExternalShortTextNodeData
  | ExternalLongTextNodeData
  | ExternalNumberNodeData
  | ExternalDateNodeData
  | ExternalTimeNodeData
  | ExternalDateTimeNodeData
  | ExternalEmailNodeData
  | ExternalPhoneNumberNodeData
  | ExternalPasswordNodeData
  | ExternalCheckboxNodeData
  | ExternalSwitchNodeData
  | ExternalComputedNodeData
  | ExternalOptionNodeData
  | ExternalEmptyNodeData
  | ExternalComponentNodeData;

export interface ExternalComponentTreeNode {
  id: string;
  data: ExternalComponentTreeNodeData;
  children?: ExternalComponentTreeNode[];
}

export type ExternalComponentTreeNodeData =
  | ExternalComponentTreeParentNodeData
  | ExternalComponentTreeLeafNodeData;

export interface ExternalComponentTreeParentNodeData {
  type: "Parent";
  name: string;
  label: { [locale: string]: string };
}

export interface ExternalComponentTreeLeafNodeData {
  type: "Leaf";
  name: string;
  label: { [locale: string]: string };
  schemaTree: ExternalComponentSchemaTreeState;
}

export interface ExternalComponentSchemaTreeState {
  root: ExternalComponentSchemaTreeNode;
}

export interface ExternalComponentSchemaTreeNode {
  id: string;
  data: ExternalComponentSchemaTreeNodeData;
  children?: ExternalComponentSchemaTreeNode[];
}

export type ExternalComponentSchemaTreeNodeData =
  | ExternalRemoteDropdownNodeData
  | ExternalDropdownNodeData
  | ExternalButtonGroupNodeData
  | ExternalRadioGroupNodeData
  | ExternalSliderNodeData
  | ExternalMultiSelectNodeData
  | ExternalCheckboxGroupNodeData
  | ExternalSwitchGroupNodeData
  | ExternalShortTextNodeData
  | ExternalLongTextNodeData
  | ExternalNumberNodeData
  | ExternalDateNodeData
  | ExternalTimeNodeData
  | ExternalDateTimeNodeData
  | ExternalEmailNodeData
  | ExternalPhoneNumberNodeData
  | ExternalPasswordNodeData
  | ExternalCheckboxNodeData
  | ExternalSwitchNodeData
  | ExternalComputedNodeData
  | ExternalOptionNodeData;

export interface ExternalConditionalNodeData extends ExternalNodeMetaData {
  type: "Conditional";
  template: string;
}

export interface ExternalFormNodeData extends ExternalNodeMetaData {
  type: "Form";
}

export interface ExternalFieldsetNodeData extends ExternalNodeMetaData {
  type: "Fieldset";
  label: { [locale: string]: string };
}

export interface ExternalRowNodeData extends ExternalNodeMetaData {
  type: "Row";
}

export interface ExternalColumnNodeData extends ExternalNodeMetaData {
  type: "Column";
  width: number;
  grow: boolean;
}

export interface ExternalObjectNodeData extends ExternalNodeMetaData {
  type: "Object";
  key: string;
}

export interface ExternalFieldGroupListNodeData extends ExternalNodeMetaData {
  type: "FieldGroupList";
  key: string;
  label: { [locale: string]: string };
  minLength: number | null;
  maxLength: number | null;
}

export interface ExternalFieldListNodeData extends ExternalNodeMetaData {
  type: "FieldList";
  key: string;
  label: { [locale: string]: string };
  minLength: number | null;
  maxLength: number | null;
  unique: boolean;
}

export interface ExternalFieldNodeData extends ExternalNodeMetaData {
  type: "Field";
  key: string;
  label: { [locale: string]: string };
}

export interface ExternalShortTextNodeData extends ExternalNodeMetaData {
  type: "ShortText";
  required: boolean;
  defaultValue: string;
  minLength: number | null;
  maxLength: number | null;
  pattern: string;
}

export interface ExternalLongTextNodeData extends ExternalNodeMetaData {
  type: "LongText";
  required: boolean;
  defaultValue: string;
  minLength: number | null;
  maxLength: number | null;
  pattern: string;
}

export interface ExternalNumberNodeData extends ExternalNodeMetaData {
  type: "Number";
  required: boolean;
  defaultValue: number | null;
  precision: number | null;
  multipleOf: number | null;
  min: number | null;
  max: number | null;
  minExclusive: number | null;
  maxExclusive: number | null;
  unit: { [locale: string]: string };
}

export interface ExternalDateNodeData extends ExternalNodeMetaData {
  type: "Date";
  required: boolean;
  defaultValue: string;
}

export interface ExternalTimeNodeData extends ExternalNodeMetaData {
  type: "Time";
  required: boolean;
  defaultValue: string;
}

export interface ExternalDateTimeNodeData extends ExternalNodeMetaData {
  type: "DateTime";
  required: boolean;
  defaultValue: string;
}

export interface ExternalEmailNodeData extends ExternalNodeMetaData {
  type: "Email";
  required: boolean;
  defaultValue: string;
}

export interface ExternalPhoneNumberNodeData extends ExternalNodeMetaData {
  type: "PhoneNumber";
  required: boolean;
  defaultValue: string;
}

export interface ExternalPasswordNodeData extends ExternalNodeMetaData {
  type: "Password";
  required: boolean;
  defaultValue: string;
  minLength: number | null;
  maxLength: number | null;
  pattern: string;
}

export interface ExternalRemoteDropdownNodeData extends ExternalNodeMetaData {
  type: "RemoteDropdown";
  path: string;
  required: boolean;
}

export interface ExternalDropdownNodeData extends ExternalNodeMetaData {
  type: "Dropdown";
  required: boolean;
  defaultValue: string;
  transferOptionMetaToParent: boolean;
}

export interface ExternalButtonGroupNodeData extends ExternalNodeMetaData {
  type: "ButtonGroup";
  required: boolean;
  defaultValue: string;
  transferOptionMetaToParent: boolean;
}

export interface ExternalRadioGroupNodeData extends ExternalNodeMetaData {
  type: "RadioGroup";
  required: boolean;
  defaultValue: string;
  transferOptionMetaToParent: boolean;
  direction: ExternalMultiElementSelectableDirection;
  columns: number;
}

export interface ExternalSliderNodeData extends ExternalNodeMetaData {
  type: "Slider";
  defaultValue: string;
  transferOptionMetaToParent: boolean;
}

export interface ExternalMultiSelectNodeData extends ExternalNodeMetaData {
  type: "MultiSelect";
  required: boolean;
  defaultValue: string[];
}

export interface ExternalCheckboxGroupNodeData extends ExternalNodeMetaData {
  type: "CheckboxGroup";
  required: boolean;
  defaultValue: string[];
  direction: ExternalMultiElementSelectableDirection;
  columns: number;
}

export interface ExternalSwitchGroupNodeData extends ExternalNodeMetaData {
  type: "SwitchGroup";
  required: boolean;
  defaultValue: string[];
  direction: ExternalMultiElementSelectableDirection;
  columns: number;
}

export type ExternalMultiElementSelectableDirection = "vertical" | "horizontal";

export interface ExternalCheckboxNodeData extends ExternalNodeMetaData {
  type: "Checkbox";
  defaultValue: boolean;
}

export interface ExternalSwitchNodeData extends ExternalNodeMetaData {
  type: "Switch";
  defaultValue: boolean;
}

export interface ExternalComputedNodeData extends ExternalNodeMetaData {
  type: "Computed";
  template: string;
  unit: { [locale: string]: string };
}

export interface ExternalOptionNodeData extends ExternalNodeMetaData {
  type: "Option";
  label: { [locale: string]: string };
  value: string;
}

export interface ExternalEmptyNodeData extends ExternalNodeMetaData {
  type: "Empty";
}

export interface ExternalComponentNodeData extends ExternalNodeMetaData {
  type: "Component";
  component: string;
}

export interface ExternalNodeMetaData {
  id?: string;
  tags?: string[];
}
