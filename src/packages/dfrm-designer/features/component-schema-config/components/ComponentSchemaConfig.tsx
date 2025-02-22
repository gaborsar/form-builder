import React from "react";
import { Config, ConfigContext, ConfigTab, ConfigTabContent } from "../../../components/Config";
import {
  type ComponentSchemaTreeNodeData,
  type SchemaTreeButtonGroupNodeData,
  type SchemaTreeCheckboxGroupNodeData,
  type SchemaTreeCheckboxNodeData,
  type SchemaTreeComputedNodeData,
  SchemaTreeConfigTabId,
  type SchemaTreeDateNodeData,
  type SchemaTreeDateTimeNodeData,
  type SchemaTreeDropdownNodeData,
  type SchemaTreeEmailNodeData,
  type SchemaTreeLongTextNodeData,
  type SchemaTreeMultiSelectNodeData,
  type SchemaTreeNumberNodeData,
  type SchemaTreeOptionNodeData,
  type SchemaTreePasswordNodeData,
  type SchemaTreePhoneNumberNodeData,
  type SchemaTreeRadioGroupNodeData,
  type SchemaTreeRemoteDropdownNodeData,
  type SchemaTreeShortTextNodeData,
  type SchemaTreeSliderNodeData,
  type SchemaTreeSwitchGroupNodeData,
  type SchemaTreeSwitchNodeData,
  type SchemaTreeTimeNodeData,
  useComponentSchemaTreeState,
  useDispatch,
  useSchemaTreeConfigState,
} from "../../../model";
import { type Node, findNodeByPath } from "../../../utils/tree";
import { ButtonGroupConfig } from "./ButtonGroupConfig";
import { CheckboxConfig } from "./CheckboxConfig";
import { CheckboxGroupConfig } from "./CheckboxGroupConfig";
import { ComputedConfig } from "./ComputedConfig";
import { DateConfig } from "./DateConfig";
import { DateTimeConfig } from "./DateTimeConfig";
import { DropdownConfig } from "./DropdownConfig";
import { EmailConfig } from "./EmailConfig";
import { IdAndTagsConfig } from "./IdAndTagsConfig";
import { LongTextConfig } from "./LongTextConfig";
import { MultiSelectConfig } from "./MultiSelectConfig";
import { NumberConfig } from "./NumberConfig";
import { OptionConfig } from "./OptionConfig";
import { PasswordConfig } from "./PasswordConfig";
import { PhoneNumberConfig } from "./PhoneNumberConfig";
import { RadioGroupConfig } from "./RadioGroupConfig";
import { RemoteDropdownConfig } from "./RemoteDropdownConfig";
import { ShortTextConfig } from "./ShortTextConfig";
import { SliderConfig } from "./SliderConfig";
import { SwitchConfig } from "./SwitchConfig";
import { SwitchGroupConfig } from "./SwitchGroupConfig";
import { TimeConfig } from "./TimeConfig";

export const ComponentSchemaConfig: React.FunctionComponent = React.memo(() => {
  const { tab } = useSchemaTreeConfigState();
  const { path, root } = useComponentSchemaTreeState();
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
  node: Node<ComponentSchemaTreeNodeData>;
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
    case "RemoteDropdown":
      return (
        <RemoteDropdownConfig
          path={path}
          node={node as Node<SchemaTreeRemoteDropdownNodeData, ComponentSchemaTreeNodeData>}
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
          node={node as Node<SchemaTreeShortTextNodeData, ComponentSchemaTreeNodeData>}
        />
      );
    case "LongText":
      return (
        <LongTextConfig
          path={path}
          node={node as Node<SchemaTreeLongTextNodeData, ComponentSchemaTreeNodeData>}
        />
      );
    case "Number":
      return (
        <NumberConfig
          path={path}
          node={node as Node<SchemaTreeNumberNodeData, ComponentSchemaTreeNodeData>}
        />
      );
    case "Date":
      return (
        <DateConfig
          path={path}
          node={node as Node<SchemaTreeDateNodeData, ComponentSchemaTreeNodeData>}
        />
      );
    case "Time":
      return (
        <TimeConfig
          path={path}
          node={node as Node<SchemaTreeTimeNodeData, ComponentSchemaTreeNodeData>}
        />
      );
    case "DateTime":
      return (
        <DateTimeConfig
          path={path}
          node={node as Node<SchemaTreeDateTimeNodeData, ComponentSchemaTreeNodeData>}
        />
      );
    case "Email":
      return (
        <EmailConfig
          path={path}
          node={node as Node<SchemaTreeEmailNodeData, ComponentSchemaTreeNodeData>}
        />
      );
    case "PhoneNumber":
      return (
        <PhoneNumberConfig
          path={path}
          node={node as Node<SchemaTreePhoneNumberNodeData, ComponentSchemaTreeNodeData>}
        />
      );
    case "Password":
      return (
        <PasswordConfig
          path={path}
          node={node as Node<SchemaTreePasswordNodeData, ComponentSchemaTreeNodeData>}
        />
      );
    case "Checkbox":
      return (
        <CheckboxConfig
          path={path}
          node={node as Node<SchemaTreeCheckboxNodeData, ComponentSchemaTreeNodeData>}
        />
      );
    case "Switch":
      return (
        <SwitchConfig
          path={path}
          node={node as Node<SchemaTreeSwitchNodeData, ComponentSchemaTreeNodeData>}
        />
      );
    case "Computed":
      return (
        <ComputedConfig
          path={path}
          node={node as Node<SchemaTreeComputedNodeData, ComponentSchemaTreeNodeData>}
        />
      );
    case "Option":
      return (
        <OptionConfig
          path={path}
          node={node as Node<SchemaTreeOptionNodeData, ComponentSchemaTreeNodeData>}
        />
      );
  }
});

const IdAndTagsTabContent: React.FunctionComponent<ContentProps> = React.memo(({ path, node }) => {
  switch (node.data.type) {
    case "RemoteDropdown":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeRemoteDropdownNodeData, SchemaTreeOptionNodeData>}
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
          node={node as Node<SchemaTreeShortTextNodeData, ComponentSchemaTreeNodeData>}
        />
      );
    case "LongText":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeLongTextNodeData, ComponentSchemaTreeNodeData>}
        />
      );
    case "Number":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeNumberNodeData, ComponentSchemaTreeNodeData>}
        />
      );
    case "Date":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeDateNodeData, ComponentSchemaTreeNodeData>}
        />
      );
    case "Time":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeTimeNodeData, ComponentSchemaTreeNodeData>}
        />
      );
    case "DateTime":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeDateTimeNodeData, ComponentSchemaTreeNodeData>}
        />
      );
    case "Email":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeEmailNodeData, ComponentSchemaTreeNodeData>}
        />
      );
    case "PhoneNumber":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreePhoneNumberNodeData, ComponentSchemaTreeNodeData>}
        />
      );
    case "Password":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreePasswordNodeData, ComponentSchemaTreeNodeData>}
        />
      );

    case "Checkbox":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeCheckboxNodeData, ComponentSchemaTreeNodeData>}
        />
      );
    case "Switch":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeSwitchNodeData, ComponentSchemaTreeNodeData>}
        />
      );
    case "Computed":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeComputedNodeData, ComponentSchemaTreeNodeData>}
        />
      );
    case "Option":
      return (
        <IdAndTagsConfig
          path={path}
          node={node as Node<SchemaTreeOptionNodeData, ComponentSchemaTreeNodeData>}
        />
      );
  }
});
