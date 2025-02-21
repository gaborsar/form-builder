import React from "react";
import { Dropdown, Field, ValidationError } from "../../../../dfrm-components";
import {
  type ComponentTreeNodeData,
  type SchemaTreeNodeData,
  useComponentTreeState,
  useDispatch,
  useIntlState,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import { replaceWithButtonGroup } from "../utils/replaceWithButtonGroup";
import { replaceWithCheckbox } from "../utils/replaceWithCheckbox";
import { replaceWithCheckboxGroup } from "../utils/replaceWithCheckboxGroup";
import { replaceWithComponent } from "../utils/replaceWithComponent";
import { replaceWithComputed } from "../utils/replaceWithComputed";
import { replaceWithDate } from "../utils/replaceWithDate";
import { replaceWithDateTime } from "../utils/replaceWithDateTime";
import { replaceWithDropdown } from "../utils/replaceWithDropdown";
import { replaceWithEmail } from "../utils/replaceWithEmail";
import { replaceWithEmpty } from "../utils/replaceWithEmpty";
import { replaceWithLongText } from "../utils/replaceWithLongText";
import { replaceWithMultiSelect } from "../utils/replaceWithMultiSelect";
import { replaceWithNumber } from "../utils/replaceWithNumber";
import { replaceWithPassword } from "../utils/replaceWithPassword";
import { replaceWithPhoneNumber } from "../utils/replaceWithPhoneNumber";
import { replaceWithRadioGroup } from "../utils/replaceWithRadioGroup";
import { replaceWithRemoteDropdown } from "../utils/replaceWithRemoteDropdown";
import { replaceWithShortText } from "../utils/replaceWithShortText";
import { replaceWithSlider } from "../utils/replaceWithSlider";
import { replaceWithSwitch } from "../utils/replaceWithSwitch";
import { replaceWithSwitchGroup } from "../utils/replaceWithSwitchGroup";
import { replaceWithTime } from "../utils/replaceWithTime";
import { wrapWithConditional } from "../utils/wrapWithConditional";

const inputOptions = [
  { value: "ShortText", label: "Short text" },
  { value: "LongText", label: "Long text" },
  { value: "Number", label: "Number" },
  { value: "Date", label: "Date" },
  { value: "Time", label: "Time" },
  { value: "DateTime", label: "Date & time" },
  { value: "Email", label: "Email" },
  { value: "PhoneNumber", label: "Phone number" },
  { value: "Password", label: "Password" },
  { value: "RemoteDropdown", label: "RemoteDropdown" },
  { value: "Dropdown", label: "Dropdown" },
  { value: "ButtonGroup", label: "Button group" },
  { value: "RadioGroup", label: "Radio group" },
  { value: "Slider", label: "Slider" },
  { value: "MultiSelect", label: "Multi select" },
  { value: "CheckboxGroup", label: "Checkbox group" },
  { value: "SwitchGroup", label: "Switch group" },
  { value: "Checkbox", label: "Checkbox" },
  { value: "Switch", label: "Switch" },
  { value: "Computed", label: "Computed" },
  { value: "Conditional", label: "Conditional" },
];

interface InputTypeFieldProps {
  path: string[];
  node: Node<SchemaTreeNodeData>;
}

export const InputTypeField: React.FunctionComponent<InputTypeFieldProps> = React.memo(
  ({ path, node }) => {
    const dispatch = useDispatch();

    const componentOptions = useComponentOptions();
    const options = React.useMemo(() => inputOptions.concat(componentOptions), [componentOptions]);

    const value = React.useMemo(() => {
      if (node.data.type === "Component") {
        return node.data.component;
      }
      return node.data.type;
    }, [node]);

    const onChangeValue = React.useCallback(
      (value: string) => {
        if (value === node.data.type) {
          return;
        }
        if (value === "ShortText") {
          return replaceWithShortText(dispatch, path, node);
        }
        if (value === "LongText") {
          return replaceWithLongText(dispatch, path, node);
        }
        if (value === "Number") {
          return replaceWithNumber(dispatch, path, node);
        }
        if (value === "Date") {
          return replaceWithDate(dispatch, path, node);
        }
        if (value === "Time") {
          return replaceWithTime(dispatch, path, node);
        }
        if (value === "DateTime") {
          return replaceWithDateTime(dispatch, path, node);
        }
        if (value === "Email") {
          return replaceWithEmail(dispatch, path, node);
        }
        if (value === "PhoneNumber") {
          return replaceWithPhoneNumber(dispatch, path, node);
        }
        if (value === "Password") {
          return replaceWithPassword(dispatch, path, node);
        }
        if (value === "RemoteDropdown") {
          return replaceWithRemoteDropdown(dispatch, path, node);
        }
        if (value === "Dropdown") {
          return replaceWithDropdown(dispatch, path, node);
        }
        if (value === "ButtonGroup") {
          return replaceWithButtonGroup(dispatch, path, node);
        }
        if (value === "RadioGroup") {
          return replaceWithRadioGroup(dispatch, path, node);
        }
        if (value === "Slider") {
          return replaceWithSlider(dispatch, path, node);
        }
        if (value === "MultiSelect") {
          return replaceWithMultiSelect(dispatch, path, node);
        }
        if (value === "CheckboxGroup") {
          return replaceWithCheckboxGroup(dispatch, path, node);
        }
        if (value === "SwitchGroup") {
          return replaceWithSwitchGroup(dispatch, path, node);
        }
        if (value === "Checkbox") {
          return replaceWithCheckbox(dispatch, path, node);
        }
        if (value === "Switch") {
          return replaceWithSwitch(dispatch, path, node);
        }
        if (value === "Computed") {
          return replaceWithComputed(dispatch, path, node);
        }
        if (value === "Conditional") {
          return wrapWithConditional(dispatch, path, node);
        }
        if (value === "") {
          return replaceWithEmpty(dispatch, path, node);
        }
        return replaceWithComponent(dispatch, path, node, value);
      },
      [dispatch, path, node],
    );

    return (
      <Field>
        <label htmlFor="type">Type</label>
        <Dropdown name="type" options={options} value={value} onChangeValue={onChangeValue} />
        <ValidationError />
      </Field>
    );
  },
);

function useComponentOptions(): { value: string; label: string }[] {
  const { locale } = useIntlState();
  const { root } = useComponentTreeState();
  return React.useMemo(() => findComponentOptionsInComponentTree(locale, root), [root, locale]);
}

function findComponentOptionsInComponentTree(
  locale: string,
  node: Node<ComponentTreeNodeData>,
): { value: string; label: string }[] {
  if (node.data.type === "Parent") {
    return node.children.flatMap((child) => findComponentOptionsInComponentTree(locale, child));
  }
  const label = node.data.label[locale] || node.data.name;
  if (label !== "") {
    return [{ value: node.id, label }];
  }
  return [];
}
