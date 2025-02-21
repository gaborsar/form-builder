import React from "react";
import type {
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
  SchemaTreeEmptyNodeData,
  SchemaTreeFieldGroupListNodeData,
  SchemaTreeFieldListNodeData,
  SchemaTreeFieldNodeData,
  SchemaTreeFieldsetNodeData,
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
import { CheckboxNodeRenderer } from "./CheckboxNodeRenderer";
import { ColumnNodeRenderer } from "./ColumnNodeRenderer";
import { ComponentNodeRenderer } from "./ComponentNodeRenderer";
import { ComputedNodeRenderer } from "./ComputedNodeRenderer";
import { ConditionalNodeRenderer } from "./ConditionalNodeRenderer";
import { EmptyNodeRenderer } from "./EmptyNodeRenderer";
import { FieldGroupListNodeRenderer } from "./FieldGroupListNodeRenderer";
import { FieldListNodeRenderer } from "./FieldListNodeRenderer";
import { FieldNodeRenderer } from "./FieldNodeRenderer";
import { FieldsetNodeRenderer } from "./FieldsetNodeRenderer";
import { InputNodeRenderer } from "./InputNodeRenderer";
import { MultiChoiceNodeRenderer } from "./MultiChoiceNodeRenderer";
import { ObjectNodeRenderer } from "./ObjectNodeRenderer";
import { OptionNodeRenderer } from "./OptionNodeRenderer";
import { RemoteDropdownNodeRenderer } from "./RemoteDropdownNodeRenderer";
import { RowNodeRenderer } from "./RowNodeRenderer";
import { SingleChoiceNodeRenderer } from "./SingleChoiceNodeRenderer";
import { SliderNodeRenderer } from "./SliderNodeRenderer";
import { SwitchNodeRenderer } from "./SwitchNodeRenderer";

interface SchemaTreeNodeRendererProps {
  parentType: string;
  level: number;
  parentPath: string[];
  node: Node<SchemaTreeNodeData>;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  label?: string;
}

export const SchemaTreeNodeRenderer: React.FunctionComponent<SchemaTreeNodeRendererProps> =
  React.memo(({ node, ...props }) => {
    switch (node.data.type) {
      case "Conditional":
        return (
          <ConditionalNodeRenderer
            {...props}
            node={node as Node<SchemaTreeConditionalNodeData, SchemaTreeNodeData>}
          />
        );
      case "Form":
        throw new Error();
      case "Fieldset":
        return (
          <FieldsetNodeRenderer
            {...props}
            node={node as Node<SchemaTreeFieldsetNodeData, SchemaTreeNodeData>}
          />
        );
      case "Row":
        return (
          <RowNodeRenderer
            {...props}
            node={node as Node<SchemaTreeRowNodeData, SchemaTreeNodeData>}
          />
        );
      case "Column":
        return (
          <ColumnNodeRenderer
            {...props}
            node={node as Node<SchemaTreeColumnNodeData, SchemaTreeNodeData>}
          />
        );
      case "Object":
        return (
          <ObjectNodeRenderer
            {...props}
            node={node as Node<SchemaTreeObjectNodeData, SchemaTreeNodeData>}
          />
        );
      case "FieldGroupList":
        return (
          <FieldGroupListNodeRenderer
            {...props}
            node={node as Node<SchemaTreeFieldGroupListNodeData, SchemaTreeNodeData>}
          />
        );
      case "FieldList":
        return (
          <FieldListNodeRenderer
            {...props}
            node={node as Node<SchemaTreeFieldListNodeData, SchemaTreeNodeData>}
          />
        );
      case "Field":
        return (
          <FieldNodeRenderer
            {...props}
            node={node as Node<SchemaTreeFieldNodeData, SchemaTreeNodeData>}
          />
        );
      case "RemoteDropdown":
        return (
          <RemoteDropdownNodeRenderer
            {...props}
            node={node as Node<SchemaTreeRemoteDropdownNodeData, SchemaTreeNodeData>}
          />
        );
      case "Dropdown":
        return (
          <SingleChoiceNodeRenderer
            {...props}
            node={node as Node<SchemaTreeDropdownNodeData, SchemaTreeOptionNodeData>}
          />
        );
      case "ButtonGroup":
        return (
          <SingleChoiceNodeRenderer
            {...props}
            node={node as Node<SchemaTreeButtonGroupNodeData, SchemaTreeOptionNodeData>}
          />
        );
      case "RadioGroup":
        return (
          <SingleChoiceNodeRenderer
            {...props}
            node={node as Node<SchemaTreeRadioGroupNodeData, SchemaTreeOptionNodeData>}
          />
        );
      case "Slider":
        return (
          <SliderNodeRenderer
            {...props}
            node={node as Node<SchemaTreeSliderNodeData, SchemaTreeOptionNodeData>}
          />
        );
      case "MultiSelect":
        return (
          <MultiChoiceNodeRenderer
            {...props}
            node={node as Node<SchemaTreeMultiSelectNodeData, SchemaTreeOptionNodeData>}
          />
        );
      case "CheckboxGroup":
        return (
          <MultiChoiceNodeRenderer
            {...props}
            node={node as Node<SchemaTreeCheckboxGroupNodeData, SchemaTreeOptionNodeData>}
          />
        );
      case "SwitchGroup":
        return (
          <MultiChoiceNodeRenderer
            {...props}
            node={node as Node<SchemaTreeSwitchGroupNodeData, SchemaTreeOptionNodeData>}
          />
        );
      case "ShortText":
        return (
          <InputNodeRenderer
            {...props}
            node={node as Node<SchemaTreeShortTextNodeData, SchemaTreeNodeData>}
          />
        );
      case "LongText":
        return (
          <InputNodeRenderer
            {...props}
            node={node as Node<SchemaTreeLongTextNodeData, SchemaTreeNodeData>}
          />
        );
      case "Number":
        return (
          <InputNodeRenderer
            {...props}
            node={node as Node<SchemaTreeNumberNodeData, SchemaTreeNodeData>}
          />
        );
      case "Date":
        return (
          <InputNodeRenderer
            {...props}
            node={node as Node<SchemaTreeDateNodeData, SchemaTreeNodeData>}
          />
        );
      case "Time":
        return (
          <InputNodeRenderer
            {...props}
            node={node as Node<SchemaTreeTimeNodeData, SchemaTreeNodeData>}
          />
        );
      case "DateTime":
        return (
          <InputNodeRenderer
            {...props}
            node={node as Node<SchemaTreeDateTimeNodeData, SchemaTreeNodeData>}
          />
        );
      case "Email":
        return (
          <InputNodeRenderer
            {...props}
            node={node as Node<SchemaTreeEmailNodeData, SchemaTreeNodeData>}
          />
        );
      case "PhoneNumber":
        return (
          <InputNodeRenderer
            {...props}
            node={node as Node<SchemaTreePhoneNumberNodeData, SchemaTreeNodeData>}
          />
        );
      case "Password":
        return (
          <InputNodeRenderer
            {...props}
            node={node as Node<SchemaTreePasswordNodeData, SchemaTreeNodeData>}
          />
        );
      case "Checkbox":
        return (
          <CheckboxNodeRenderer
            {...props}
            node={node as Node<SchemaTreeCheckboxNodeData, SchemaTreeNodeData>}
          />
        );
      case "Switch":
        return (
          <SwitchNodeRenderer
            {...props}
            node={node as Node<SchemaTreeSwitchNodeData, SchemaTreeNodeData>}
          />
        );
      case "Computed":
        return (
          <ComputedNodeRenderer
            {...props}
            node={node as Node<SchemaTreeComputedNodeData, SchemaTreeNodeData>}
          />
        );
      case "Option":
        return (
          <OptionNodeRenderer
            {...props}
            node={node as Node<SchemaTreeOptionNodeData, SchemaTreeNodeData>}
          />
        );
      case "Component":
        return (
          <ComponentNodeRenderer
            {...props}
            node={node as Node<SchemaTreeComponentNodeData, SchemaTreeNodeData>}
          />
        );
      case "Empty":
        return (
          <EmptyNodeRenderer
            {...props}
            node={node as Node<SchemaTreeEmptyNodeData, SchemaTreeNodeData>}
          />
        );
    }
  });
