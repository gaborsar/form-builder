import React from "react";
import type {
  ComponentSchemaTreeNodeData,
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
} from "../../../model";
import type { Node } from "../../../utils/tree";
import { CheckboxNodeRenderer } from "./CheckboxNodeRenderer";
import { ComputedNodeRenderer } from "./ComputedNodeRenderer";
import { InputNodeRenderer } from "./InputNodeRenderer";
import { MultiChoiceNodeRenderer } from "./MultiChoiceNodeRenderer";
import { RemoteDropdownNodeRenderer } from "./RemoteDropdownNodeRenderer";
import { SingleChoiceNodeRenderer } from "./SingleChoiceNodeRenderer";
import { SliderNodeRenderer } from "./SliderNodeRenderer";
import { SwitchNodeRenderer } from "./SwitchNodeRenderer";

interface ComponentSchemaTreeNodeRendererProps {
  node: Node<ComponentSchemaTreeNodeData>;
}

export const ComponentSchemaTreeNodeRenderer: React.FunctionComponent<ComponentSchemaTreeNodeRendererProps> =
  React.memo(({ node, ...props }) => {
    switch (node.data.type) {
      case "RemoteDropdown":
        return (
          <RemoteDropdownNodeRenderer
            {...props}
            node={node as Node<SchemaTreeRemoteDropdownNodeData, SchemaTreeOptionNodeData>}
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
            node={node as Node<SchemaTreeShortTextNodeData, ComponentSchemaTreeNodeData>}
          />
        );
      case "LongText":
        return (
          <InputNodeRenderer
            {...props}
            node={node as Node<SchemaTreeLongTextNodeData, ComponentSchemaTreeNodeData>}
          />
        );
      case "Number":
        return (
          <InputNodeRenderer
            {...props}
            node={node as Node<SchemaTreeNumberNodeData, ComponentSchemaTreeNodeData>}
          />
        );
      case "Date":
        return (
          <InputNodeRenderer
            {...props}
            node={node as Node<SchemaTreeDateNodeData, ComponentSchemaTreeNodeData>}
          />
        );
      case "Time":
        return (
          <InputNodeRenderer
            {...props}
            node={node as Node<SchemaTreeTimeNodeData, ComponentSchemaTreeNodeData>}
          />
        );
      case "DateTime":
        return (
          <InputNodeRenderer
            {...props}
            node={node as Node<SchemaTreeDateTimeNodeData, ComponentSchemaTreeNodeData>}
          />
        );
      case "Email":
        return (
          <InputNodeRenderer
            {...props}
            node={node as Node<SchemaTreeEmailNodeData, ComponentSchemaTreeNodeData>}
          />
        );
      case "PhoneNumber":
        return (
          <InputNodeRenderer
            {...props}
            node={node as Node<SchemaTreePhoneNumberNodeData, ComponentSchemaTreeNodeData>}
          />
        );
      case "Password":
        return (
          <InputNodeRenderer
            {...props}
            node={node as Node<SchemaTreePasswordNodeData, ComponentSchemaTreeNodeData>}
          />
        );
      case "Checkbox":
        return (
          <CheckboxNodeRenderer
            {...props}
            node={node as Node<SchemaTreeCheckboxNodeData, ComponentSchemaTreeNodeData>}
          />
        );
      case "Switch":
        return (
          <SwitchNodeRenderer
            {...props}
            node={node as Node<SchemaTreeSwitchNodeData, ComponentSchemaTreeNodeData>}
          />
        );
      case "Computed":
        return (
          <ComputedNodeRenderer
            {...props}
            node={node as Node<SchemaTreeComputedNodeData, ComponentSchemaTreeNodeData>}
          />
        );
      case "Option":
        throw new Error();
    }
  });
