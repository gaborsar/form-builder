import type { ExplorerTreeState } from "../explorer-tree";
import type {
  SchemaTreeButtonGroupNodeData,
  SchemaTreeCheckboxGroupNodeData,
  SchemaTreeCheckboxNodeData,
  SchemaTreeComputedNodeData,
  SchemaTreeDateNodeData,
  SchemaTreeDateTimeNodeData,
  SchemaTreeDropdownNodeData,
  SchemaTreeEmailNodeData,
  SchemaTreeLongTextNodeData,
  SchemaTreeMultiSelectNodeData,
  SchemaTreeNumberNodeData,
  SchemaTreeOptionNodeData,
  SchemaTreePasswordNodeData,
  SchemaTreePhoneNumberNodeData,
  SchemaTreeRadioGroupNodeData,
  SchemaTreeRemoteDropdownNodeData,
  SchemaTreeShortTextNodeData,
  SchemaTreeSliderNodeData,
  SchemaTreeSwitchGroupNodeData,
  SchemaTreeSwitchNodeData,
  SchemaTreeTimeNodeData,
} from "../schema-tree";

export type ComponentSchemaTreeState = ExplorerTreeState<ComponentSchemaTreeNodeData>;

export type ComponentSchemaTreeNodeData =
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
  | SchemaTreeOptionNodeData;
