import React from "react";
import { Config, ConfigContext, ConfigTab, ConfigTabContent } from "../../../components/Config";
import {
  type SchemaTreeButtonGroupNodeData,
  type SchemaTreeCheckboxGroupNodeData,
  type SchemaTreeCheckboxNodeData,
  type SchemaTreeColumnNodeData,
  type SchemaTreeComponentNodeData,
  type SchemaTreeComputedNodeData,
  type SchemaTreeConditionalNodeData,
  SchemaTreeConfigTabId,
  type SchemaTreeDateNodeData,
  type SchemaTreeDateTimeNodeData,
  type SchemaTreeDropdownNodeData,
  type SchemaTreeEmailNodeData,
  type SchemaTreeEmptyNodeData,
  type SchemaTreeFieldGroupListNodeData,
  type SchemaTreeFieldListNodeData,
  type SchemaTreeFieldNodeData,
  type SchemaTreeFieldsetNodeData,
  type SchemaTreeFormNodeData,
  type SchemaTreeLongTextNodeData,
  type SchemaTreeMultiSelectNodeData,
  type SchemaTreeNodeData,
  type SchemaTreeNumberNodeData,
  type SchemaTreeObjectNodeData,
  type SchemaTreeOptionNodeData,
  type SchemaTreePasswordNodeData,
  type SchemaTreePhoneNumberNodeData,
  type SchemaTreeRadioGroupNodeData,
  type SchemaTreeRemoteDropdownNodeData,
  type SchemaTreeRowNodeData,
  type SchemaTreeShortTextNodeData,
  type SchemaTreeSliderNodeData,
  type SchemaTreeSwitchGroupNodeData,
  type SchemaTreeSwitchNodeData,
  type SchemaTreeTimeNodeData,
  useDispatch,
  useFormSchemaTreeState,
  useSchemaTreeConfigState,
} from "../../../model";
import { type Node, findNodeByPath } from "../../../utils/tree";
import { ButtonGroupConfig } from "./ButtonGroupConfig";
import { CheckboxConfig } from "./CheckboxConfig";
import { CheckboxGroupConfig } from "./CheckboxGroupConfig";
import { ColumnConfig } from "./ColumnConfig";
import { ComponentConfig } from "./ComponentConfig";
import { ComputedConfig } from "./ComputedConfig";
import { ConditionalConfig } from "./ConditionalConfig";
import { DateConfig } from "./DateConfig";
import { DateTimeConfig } from "./DateTimeConfig";
import { DropdownConfig } from "./DropdownConfig";
import { EmailConfig } from "./EmailConfig";
import { EmptyConfig } from "./EmptyConfig";
import { FieldConfig } from "./FieldConfig";
import { FieldGroupListConfig } from "./FieldGroupListConfig";
import { FieldListConfig } from "./FieldListConfig";
import { FieldsetConfig } from "./FieldsetConfig";
import { IdAndTagsConfig } from "./IdAndTagsConfig";
import { LongTextConfig } from "./LongTextConfig";
import { MultiSelectConfig } from "./MultiSelectConfig";
import { NumberConfig } from "./NumberConfig";
import { ObjectConfig } from "./ObjectConfig";
import { OptionConfig } from "./OptionConfig";
import { PasswordConfig } from "./PasswordConfig";
import { PhoneNumberConfig } from "./PhoneNumberConfig";
import { RadioGroupConfig } from "./RadioGroupConfig";
import { RemoteDropdownConfig } from "./RemoteDropdownConfig";
import { RowConfig } from "./RowConfig";
import { ShortTextConfig } from "./ShortTextConfig";
import { SliderConfig } from "./SliderConfig";
import { SwitchConfig } from "./SwitchConfig";
import { SwitchGroupConfig } from "./SwitchGroupConfig";
import { TimeConfig } from "./TimeConfig";

export const FormSchemaConfig: React.FunctionComponent = React.memo(() => {
  const { tab } = useSchemaTreeConfigState();
  const { path, root } = useFormSchemaTreeState();
  const dispatch = useDispatch();

  const node = React.useMemo(() => findNodeByPath(root, path), [root, path]);

  const setTab = React.useCallback(
    (tab: SchemaTreeConfigTabId) => {
      dispatch({
        type: "schema-tree-config__set-tab",
        payload: { tab },
      });
    },
    [dispatch],
  );

  return (
    <ConfigContext.Provider value={{ tab, setTab }}>
      <Config key={node.id} tabs={<Tabs />} content={<Content path={path} node={node} />} />
    </ConfigContext.Provider>
  );
});

const Tabs: React.FunctionComponent = React.memo(() => (
  <>
    <ConfigTab value={SchemaTreeConfigTabId.Properties}>Properties</ConfigTab>
    <ConfigTab value={SchemaTreeConfigTabId.IdAndTags}>Identifier & Tags</ConfigTab>
  </>
));

interface ContentProps {
  path: string[];
  node: Node<SchemaTreeNodeData>;
}

const Content: React.FunctionComponent<ContentProps> = React.memo(({ path, node }) => (
  <>
    <ConfigTabContent value={SchemaTreeConfigTabId.Properties}>
      <PropertiesTabContent path={path} node={node} />
    </ConfigTabContent>
    <ConfigTabContent value={SchemaTreeConfigTabId.IdAndTags}>
      <IdAndTagsTabContent path={path} node={node} />
    </ConfigTabContent>
  </>
));

const PropertiesTabContent: React.FunctionComponent<ContentProps> = React.memo(({ path, node }) => {
  switch (node.data.type) {
    case "Conditional":
      return (
        <ConditionalConfig
          path={path}
          node={node as Node<SchemaTreeConditionalNodeData, SchemaTreeNodeData>}
        />
      );
    case "Fieldset":
      return (
        <FieldsetConfig
          path={path}
          node={node as Node<SchemaTreeFieldsetNodeData, SchemaTreeNodeData>}
        />
      );
    case "Row":
      return (
        <RowConfig path={path} node={node as Node<SchemaTreeRowNodeData, SchemaTreeNodeData>} />
      );
    case "Column":
      return (
        <ColumnConfig
          path={path}
          node={node as Node<SchemaTreeColumnNodeData, SchemaTreeNodeData>}
        />
      );
    case "Object":
      return (
        <ObjectConfig
          path={path}
          node={node as Node<SchemaTreeObjectNodeData, SchemaTreeNodeData>}
        />
      );
    case "FieldGroupList":
      return (
        <FieldGroupListConfig
          path={path}
          node={node as Node<SchemaTreeFieldGroupListNodeData, SchemaTreeNodeData>}
        />
      );
    case "FieldList":
      return (
        <FieldListConfig
          path={path}
          node={node as Node<SchemaTreeFieldListNodeData, SchemaTreeNodeData>}
        />
      );
    case "Field":
      return (
        <FieldConfig path={path} node={node as Node<SchemaTreeFieldNodeData, SchemaTreeNodeData>} />
      );
    case "RemoteDropdown":
      return (
        <RemoteDropdownConfig
          path={path}
          node={node as Node<SchemaTreeRemoteDropdownNodeData, SchemaTreeNodeData>}
        />
      );
    case "Dropdown":
      return (
        <DropdownConfig
          path={path}
          node={node as Node<SchemaTreeDropdownNodeData, SchemaTreeOptionNodeData>}
        />
      );
    case "ButtonGroup":
      return (
        <ButtonGroupConfig
          path={path}
          node={node as Node<SchemaTreeButtonGroupNodeData, SchemaTreeOptionNodeData>}
        />
      );
    case "RadioGroup":
      return (
        <RadioGroupConfig
          path={path}
          node={node as Node<SchemaTreeRadioGroupNodeData, SchemaTreeOptionNodeData>}
        />
      );
    case "Slider":
      return (
        <SliderConfig
          path={path}
          node={node as Node<SchemaTreeSliderNodeData, SchemaTreeOptionNodeData>}
        />
      );
    case "MultiSelect":
      return (
        <MultiSelectConfig
          path={path}
          node={node as Node<SchemaTreeMultiSelectNodeData, SchemaTreeOptionNodeData>}
        />
      );
    case "CheckboxGroup":
      return (
        <CheckboxGroupConfig
          path={path}
          node={node as Node<SchemaTreeCheckboxGroupNodeData, SchemaTreeOptionNodeData>}
        />
      );
    case "SwitchGroup":
      return (
        <SwitchGroupConfig
          path={path}
          node={node as Node<SchemaTreeSwitchGroupNodeData, SchemaTreeOptionNodeData>}
        />
      );
    case "ShortText":
      return (
        <ShortTextConfig
          path={path}
          node={node as Node<SchemaTreeShortTextNodeData, SchemaTreeNodeData>}
        />
      );
    case "LongText":
      return (
        <LongTextConfig
          path={path}
          node={node as Node<SchemaTreeLongTextNodeData, SchemaTreeNodeData>}
        />
      );
    case "Number":
      return (
        <NumberConfig
          path={path}
          node={node as Node<SchemaTreeNumberNodeData, SchemaTreeNodeData>}
        />
      );
    case "Date":
      return (
        <DateConfig path={path} node={node as Node<SchemaTreeDateNodeData, SchemaTreeNodeData>} />
      );
    case "Time":
      return (
        <TimeConfig path={path} node={node as Node<SchemaTreeTimeNodeData, SchemaTreeNodeData>} />
      );
    case "DateTime":
      return (
        <DateTimeConfig
          path={path}
          node={node as Node<SchemaTreeDateTimeNodeData, SchemaTreeNodeData>}
        />
      );
    case "Email":
      return (
        <EmailConfig path={path} node={node as Node<SchemaTreeEmailNodeData, SchemaTreeNodeData>} />
      );
    case "PhoneNumber":
      return (
        <PhoneNumberConfig
          path={path}
          node={node as Node<SchemaTreePhoneNumberNodeData, SchemaTreeNodeData>}
        />
      );
    case "Password":
      return (
        <PasswordConfig
          path={path}
          node={node as Node<SchemaTreePasswordNodeData, SchemaTreeNodeData>}
        />
      );
    case "Checkbox":
      return (
        <CheckboxConfig
          path={path}
          node={node as Node<SchemaTreeCheckboxNodeData, SchemaTreeNodeData>}
        />
      );
    case "Switch":
      return (
        <SwitchConfig
          path={path}
          node={node as Node<SchemaTreeSwitchNodeData, SchemaTreeNodeData>}
        />
      );
    case "Computed":
      return (
        <ComputedConfig
          path={path}
          node={node as Node<SchemaTreeComputedNodeData, SchemaTreeNodeData>}
        />
      );
    case "Option":
      return (
        <OptionConfig
          path={path}
          node={node as Node<SchemaTreeOptionNodeData, SchemaTreeNodeData>}
        />
      );
    case "Empty":
      return (
        <EmptyConfig path={path} node={node as Node<SchemaTreeEmptyNodeData, SchemaTreeNodeData>} />
      );
    case "Component":
      return (
        <ComponentConfig
          path={path}
          node={node as Node<SchemaTreeComponentNodeData, SchemaTreeNodeData>}
        />
      );
  }
  return null;
});

const IdAndTagsTabContent: React.FunctionComponent<ContentProps> = React.memo(({ path, node }) => {
  switch (node.data.type) {
    case "Form":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeFormNodeData, SchemaTreeNodeData>}
        />
      );
    case "Object":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeObjectNodeData, SchemaTreeNodeData>}
        />
      );
    case "FieldGroupList":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeFieldGroupListNodeData, SchemaTreeNodeData>}
        />
      );
    case "FieldList":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeFieldListNodeData, SchemaTreeNodeData>}
        />
      );
    case "Field":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeFieldNodeData, SchemaTreeNodeData>}
        />
      );
    case "RemoteDropdown":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeRemoteDropdownNodeData, SchemaTreeNodeData>}
        />
      );
    case "Dropdown":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeDropdownNodeData, SchemaTreeOptionNodeData>}
        />
      );
    case "ButtonGroup":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeButtonGroupNodeData, SchemaTreeOptionNodeData>}
        />
      );
    case "RadioGroup":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeRadioGroupNodeData, SchemaTreeOptionNodeData>}
        />
      );
    case "Slider":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeSliderNodeData, SchemaTreeOptionNodeData>}
        />
      );
    case "MultiSelect":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeMultiSelectNodeData, SchemaTreeOptionNodeData>}
        />
      );
    case "CheckboxGroup":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeCheckboxGroupNodeData, SchemaTreeOptionNodeData>}
        />
      );
    case "SwitchGroup":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeSwitchGroupNodeData, SchemaTreeOptionNodeData>}
        />
      );

    case "ShortText":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeShortTextNodeData, SchemaTreeNodeData>}
        />
      );
    case "LongText":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeLongTextNodeData, SchemaTreeNodeData>}
        />
      );
    case "Number":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeNumberNodeData, SchemaTreeNodeData>}
        />
      );
    case "Date":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeDateNodeData, SchemaTreeNodeData>}
        />
      );
    case "Time":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeTimeNodeData, SchemaTreeNodeData>}
        />
      );
    case "DateTime":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeDateTimeNodeData, SchemaTreeNodeData>}
        />
      );
    case "Email":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeEmailNodeData, SchemaTreeNodeData>}
        />
      );
    case "PhoneNumber":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreePhoneNumberNodeData, SchemaTreeNodeData>}
        />
      );
    case "Password":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreePasswordNodeData, SchemaTreeNodeData>}
        />
      );
    case "Checkbox":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeCheckboxNodeData, SchemaTreeNodeData>}
        />
      );
    case "Switch":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeSwitchNodeData, SchemaTreeNodeData>}
        />
      );
    case "Computed":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeComputedNodeData, SchemaTreeNodeData>}
        />
      );
    case "Option":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeOptionNodeData, SchemaTreeNodeData>}
        />
      );
    case "Component":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeComponentNodeData, SchemaTreeNodeData>}
        />
      );
  }
  return null;
});
