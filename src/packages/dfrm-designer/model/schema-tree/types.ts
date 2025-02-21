import type { ExplorerTreeState } from "../explorer-tree";

export type SchemaTreeState = ExplorerTreeState<SchemaTreeNodeData>;

export type SchemaTreeNodeData =
  | SchemaTreeConditionalNodeData
  | SchemaTreeFormNodeData
  | SchemaTreeFieldsetNodeData
  | SchemaTreeRowNodeData
  | SchemaTreeColumnNodeData
  | SchemaTreeObjectNodeData
  | SchemaTreeFieldGroupListNodeData
  | SchemaTreeFieldListNodeData
  | SchemaTreeFieldNodeData
  | SchemaTreeRemoteDropdownNodeData
  | SchemaTreeDropdownNodeData
  | SchemaTreeButtonGroupNodeData
  | SchemaTreeRadioGroupNodeData
  | SchemaTreeSliderNodeData
  | SchemaTreeMultiSelectNodeData
  | SchemaTreeCheckboxGroupNodeData
  | SchemaTreeSwitchGroupNodeData
  | SchemaTreeShortTextNodeData
  | SchemaTreeLongTextNodeData
  | SchemaTreeNumberNodeData
  | SchemaTreeDateNodeData
  | SchemaTreeTimeNodeData
  | SchemaTreeDateTimeNodeData
  | SchemaTreeEmailNodeData
  | SchemaTreePhoneNumberNodeData
  | SchemaTreePasswordNodeData
  | SchemaTreeCheckboxNodeData
  | SchemaTreeSwitchNodeData
  | SchemaTreeComputedNodeData
  | SchemaTreeOptionNodeData
  | SchemaTreeEmptyNodeData
  | SchemaTreeComponentNodeData;

export interface SchemaTreeConditionalNodeData {
  type: "Conditional";
  template: string;
}

export interface SchemaTreeFormNodeData extends SchemaTreeMetaData {
  type: "Form";
}

export interface SchemaTreeFieldsetNodeData {
  type: "Fieldset";
  label: { [locale: string]: string };
}

export interface SchemaTreeRowNodeData {
  type: "Row";
}

export interface SchemaTreeColumnNodeData {
  type: "Column";
  width: number;
  grow: boolean;
}

export interface SchemaTreeObjectNodeData extends SchemaTreeMetaData {
  type: "Object";
  key: string;
}

export interface SchemaTreeFieldGroupListNodeData extends SchemaTreeMetaData {
  type: "FieldGroupList";
  key: string;
  label: { [locale: string]: string };
  minLength: number | null;
  maxLength: number | null;
}

export interface SchemaTreeFieldListNodeData extends SchemaTreeMetaData {
  type: "FieldList";
  key: string;
  label: { [locale: string]: string };
  minLength: number | null;
  maxLength: number | null;
  unique: boolean;
}

export interface SchemaTreeFieldNodeData extends SchemaTreeMetaData {
  type: "Field";
  key: string;
  label: { [locale: string]: string };
}

export interface SchemaTreeRemoteDropdownNodeData extends SchemaTreeMetaData {
  type: "RemoteDropdown";
  path: string;
  required: boolean;
}

export interface SchemaTreeDropdownNodeData extends SchemaTreeMetaData {
  type: "Dropdown";
  required: boolean;
  defaultValue: string;
  transferOptionMetaToParent: boolean;
}

export interface SchemaTreeButtonGroupNodeData extends SchemaTreeMetaData {
  type: "ButtonGroup";
  required: boolean;
  defaultValue: string;
  transferOptionMetaToParent: boolean;
}

export interface SchemaTreeRadioGroupNodeData extends SchemaTreeMetaData {
  type: "RadioGroup";
  required: boolean;
  defaultValue: string;
  transferOptionMetaToParent: boolean;
  direction: SchemaTreeMultiElementSelectableDirection;
  columns: number;
}

export interface SchemaTreeSliderNodeData extends SchemaTreeMetaData {
  type: "Slider";
  defaultValue: string;
  transferOptionMetaToParent: boolean;
}

export interface SchemaTreeMultiSelectNodeData extends SchemaTreeMetaData {
  type: "MultiSelect";
  defaultValue: string[];
  required: boolean;
}

export interface SchemaTreeCheckboxGroupNodeData extends SchemaTreeMetaData {
  type: "CheckboxGroup";
  required: boolean;
  defaultValue: string[];
  direction: SchemaTreeMultiElementSelectableDirection;
  columns: number;
}

export interface SchemaTreeSwitchGroupNodeData extends SchemaTreeMetaData {
  type: "SwitchGroup";
  required: boolean;
  defaultValue: string[];
  direction: SchemaTreeMultiElementSelectableDirection;
  columns: number;
}

export type SchemaTreeMultiElementSelectableDirection = "vertical" | "horizontal";

export interface SchemaTreeShortTextNodeData extends SchemaTreeMetaData {
  type: "ShortText";
  required: boolean;
  defaultValue: string;
  minLength: number | null;
  maxLength: number | null;
  pattern: string;
}

export interface SchemaTreeLongTextNodeData extends SchemaTreeMetaData {
  type: "LongText";
  required: boolean;
  defaultValue: string;
  minLength: number | null;
  maxLength: number | null;
  pattern: string;
}

export interface SchemaTreeNumberNodeData extends SchemaTreeMetaData {
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

export interface SchemaTreeDateNodeData extends SchemaTreeMetaData {
  type: "Date";
  required: boolean;
  defaultValue: string;
}

export interface SchemaTreeTimeNodeData extends SchemaTreeMetaData {
  type: "Time";
  required: boolean;
  defaultValue: string;
}

export interface SchemaTreeDateTimeNodeData extends SchemaTreeMetaData {
  type: "DateTime";
  required: boolean;
  defaultValue: string;
}

export interface SchemaTreeEmailNodeData extends SchemaTreeMetaData {
  type: "Email";
  required: boolean;
  defaultValue: string;
}

export interface SchemaTreePhoneNumberNodeData extends SchemaTreeMetaData {
  type: "PhoneNumber";
  required: boolean;
  defaultValue: string;
}

export interface SchemaTreePasswordNodeData extends SchemaTreeMetaData {
  type: "Password";
  required: boolean;
  defaultValue: string;
  minLength: number | null;
  maxLength: number | null;
  pattern: string;
}

export interface SchemaTreeCheckboxNodeData extends SchemaTreeMetaData {
  type: "Checkbox";
  defaultValue: boolean;
}

export interface SchemaTreeSwitchNodeData extends SchemaTreeMetaData {
  type: "Switch";
  defaultValue: boolean;
}

export interface SchemaTreeComputedNodeData extends SchemaTreeMetaData {
  type: "Computed";
  template: string;
  unit: { [locale: string]: string };
}

export interface SchemaTreeOptionNodeData extends SchemaTreeMetaData {
  type: "Option";
  label: { [locale: string]: string };
  value: string;
}

export interface SchemaTreeEmptyNodeData {
  type: "Empty";
}

export interface SchemaTreeComponentNodeData extends SchemaTreeMetaData {
  type: "Component";
  component: string;
}

export interface SchemaTreeMetaData {
  id?: string;
  tags?: string[];
}
