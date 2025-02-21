import type { CreateSchemaOptions } from "../../../../dfrm-schema";
import type {
  Meta,
  SchemaTreeButtonGroupNodeData,
  SchemaTreeCheckboxGroupNodeData,
  SchemaTreeCheckboxNodeData,
  SchemaTreeColumnNodeData,
  SchemaTreeComponentNodeData,
  SchemaTreeComputedNodeData,
  SchemaTreeConditionalNodeData,
  SchemaTreeDateNodeData,
  SchemaTreeDateTimeNodeData,
  SchemaTreeDropdownNodeData,
  SchemaTreeEmailNodeData,
  SchemaTreeFieldGroupListNodeData,
  SchemaTreeFieldListNodeData,
  SchemaTreeFieldNodeData,
  SchemaTreeFieldsetNodeData,
  SchemaTreeFormNodeData,
  SchemaTreeLongTextNodeData,
  SchemaTreeMultiSelectNodeData,
  SchemaTreeNodeData,
  SchemaTreeNumberNodeData,
  SchemaTreeObjectNodeData,
  SchemaTreeOptionNodeData,
  SchemaTreePasswordNodeData,
  SchemaTreePhoneNumberNodeData,
  SchemaTreeRadioGroupNodeData,
  SchemaTreeRemoteDropdownNodeData,
  SchemaTreeRowNodeData,
  SchemaTreeShortTextNodeData,
  SchemaTreeSliderNodeData,
  SchemaTreeSwitchGroupNodeData,
  SchemaTreeSwitchNodeData,
  SchemaTreeTimeNodeData,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import type { ComponentMap, TagMap } from "../../inspector";
import { convertButtonGroupNode } from "./convertButtonGroupNode";
import { convertCheckboxGroupNode } from "./convertCheckboxGroupNode";
import { convertCheckboxNode } from "./convertCheckboxNode";
import { convertColumnNode } from "./convertColumnNode";
import { convertComponentNode } from "./convertComponent";
import { convertComputedNode } from "./convertComputedNode";
import { convertConditionalNode } from "./convertConditionalNode";
import { convertDateNode } from "./convertDateNode";
import { convertDateTimeNode } from "./convertDateTimeNode";
import { convertDropdownNode } from "./convertDropdownNode";
import { convertEmailNode } from "./convertEmailNode";
import { convertFieldGroupListNode } from "./convertFieldGroupListNode";
import { convertFieldListNode } from "./convertFieldListNode";
import { convertFieldNode } from "./convertFieldNode";
import { convertFieldsetNode } from "./convertFieldsetNode";
import { convertFormNode } from "./convertFormNode";
import { convertLongTextNode } from "./convertLongTextNode";
import { convertMultiSelectNode } from "./convertMultiSelectNode";
import { convertNumberNode } from "./convertNumberNode";
import { convertObjectNode } from "./convertObjectNode";
import { convertPasswordNode } from "./convertPasswordNode";
import { convertPhoneNumberNode } from "./convertPhoneNumberNode";
import { convertRadioGroupNode } from "./convertRadioGroup";
import { convertRemoteDropdownNode } from "./convertRemoteDropdownNode";
import { convertRowNode } from "./convertRowNode";
import { convertShortTextNode } from "./convertShortTextNode";
import { convertSliderNode } from "./convertSliderNode";
import { convertSwitchGroupNode } from "./convertSwitchGroupNode";
import { convertSwitchNode } from "./convertSwitchNode";
import { convertTimeNode } from "./convertTimeNode";

export function convertNode(
  tagMap: TagMap,
  componentMap: ComponentMap,
  node: Node<SchemaTreeNodeData>,
): CreateSchemaOptions<Meta> | null {
  switch (node.data.type) {
    case "Conditional":
      return convertConditionalNode(
        tagMap,
        componentMap,
        node as Node<SchemaTreeConditionalNodeData, SchemaTreeNodeData>,
      );
    case "Form":
      return convertFormNode(
        tagMap,
        componentMap,
        node as Node<SchemaTreeFormNodeData, SchemaTreeNodeData>,
      );
    case "Fieldset":
      return convertFieldsetNode(
        tagMap,
        componentMap,
        node as Node<SchemaTreeFieldsetNodeData, SchemaTreeNodeData>,
      );
    case "Row":
      return convertRowNode(
        tagMap,
        componentMap,
        node as Node<SchemaTreeRowNodeData, SchemaTreeNodeData>,
      );
    case "Column":
      return convertColumnNode(
        tagMap,
        componentMap,
        node as Node<SchemaTreeColumnNodeData, SchemaTreeNodeData>,
      );
    case "Object":
      return convertObjectNode(
        tagMap,
        componentMap,
        node as Node<SchemaTreeObjectNodeData, SchemaTreeNodeData>,
      );
    case "FieldGroupList":
      return convertFieldGroupListNode(
        tagMap,
        componentMap,
        node as Node<SchemaTreeFieldGroupListNodeData, SchemaTreeNodeData>,
      );
    case "FieldList":
      return convertFieldListNode(
        tagMap,
        componentMap,
        node as Node<SchemaTreeFieldListNodeData, SchemaTreeNodeData>,
      );
    case "Field":
      return convertFieldNode(
        tagMap,
        componentMap,
        node as Node<SchemaTreeFieldNodeData, SchemaTreeNodeData>,
      );
    case "RemoteDropdown":
      return convertRemoteDropdownNode(
        tagMap,
        node as Node<SchemaTreeRemoteDropdownNodeData, SchemaTreeNodeData>,
      );
    case "Dropdown":
      return convertDropdownNode(
        tagMap,
        node as Node<SchemaTreeDropdownNodeData, SchemaTreeOptionNodeData>,
      );
    case "ButtonGroup":
      return convertButtonGroupNode(
        tagMap,
        node as Node<SchemaTreeButtonGroupNodeData, SchemaTreeOptionNodeData>,
      );
    case "RadioGroup":
      return convertRadioGroupNode(
        tagMap,
        node as Node<SchemaTreeRadioGroupNodeData, SchemaTreeOptionNodeData>,
      );
    case "Slider":
      return convertSliderNode(
        tagMap,
        node as Node<SchemaTreeSliderNodeData, SchemaTreeOptionNodeData>,
      );
    case "MultiSelect":
      return convertMultiSelectNode(
        tagMap,
        node as Node<SchemaTreeMultiSelectNodeData, SchemaTreeOptionNodeData>,
      );
    case "CheckboxGroup":
      return convertCheckboxGroupNode(
        tagMap,
        node as Node<SchemaTreeCheckboxGroupNodeData, SchemaTreeOptionNodeData>,
      );
    case "SwitchGroup":
      return convertSwitchGroupNode(
        tagMap,
        node as Node<SchemaTreeSwitchGroupNodeData, SchemaTreeOptionNodeData>,
      );
    case "ShortText":
      return convertShortTextNode(
        tagMap,
        node as Node<SchemaTreeShortTextNodeData, SchemaTreeNodeData>,
      );
    case "LongText":
      return convertLongTextNode(
        tagMap,
        node as Node<SchemaTreeLongTextNodeData, SchemaTreeNodeData>,
      );
    case "Number":
      return convertNumberNode(tagMap, node as Node<SchemaTreeNumberNodeData, SchemaTreeNodeData>);
    case "Date":
      return convertDateNode(tagMap, node as Node<SchemaTreeDateNodeData, SchemaTreeNodeData>);
    case "Time":
      return convertTimeNode(tagMap, node as Node<SchemaTreeTimeNodeData, SchemaTreeNodeData>);
    case "DateTime":
      return convertDateTimeNode(
        tagMap,
        node as Node<SchemaTreeDateTimeNodeData, SchemaTreeNodeData>,
      );
    case "Email":
      return convertEmailNode(tagMap, node as Node<SchemaTreeEmailNodeData, SchemaTreeNodeData>);
    case "PhoneNumber":
      return convertPhoneNumberNode(
        tagMap,
        node as Node<SchemaTreePhoneNumberNodeData, SchemaTreeNodeData>,
      );
    case "Password":
      return convertPasswordNode(
        tagMap,
        node as Node<SchemaTreePasswordNodeData, SchemaTreeNodeData>,
      );
    case "Checkbox":
      return convertCheckboxNode(
        tagMap,
        node as Node<SchemaTreeCheckboxNodeData, SchemaTreeNodeData>,
      );
    case "Switch":
      return convertSwitchNode(tagMap, node as Node<SchemaTreeSwitchNodeData, SchemaTreeNodeData>);
    case "Computed":
      return convertComputedNode(
        tagMap,
        node as Node<SchemaTreeComputedNodeData, SchemaTreeNodeData>,
      );
    case "Component":
      return convertComponentNode(
        tagMap,
        componentMap,
        node as Node<SchemaTreeComponentNodeData, SchemaTreeNodeData>,
      );
    case "Empty":
      return null;
    case "Option":
      return null;
  }
}
