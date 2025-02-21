import type { RenderInputResult } from "dfrm-schema";
import React from "react";
import { FieldContext } from "../contexts/FieldContext";
import { ButtonGroupRenderer } from "./ButtonGroup";
import { CheckboxRenderer } from "./Checkbox";
import { CheckboxGroupRenderer } from "./CheckboxGroup";
import { ComputedRenderer } from "./Computed";
import { DateRenderer } from "./Date";
import { DateTimeRenderer } from "./DateTime";
import { DropdownRenderer } from "./Dropdown";
import { EmailRenderer } from "./Email";
import { LongTextRenderer } from "./LongText";
import { MultiSelectRenderer } from "./MultiSelect";
import { NumberRenderer } from "./Number";
import { PasswordRenderer } from "./Password";
import { PhoneNumberRenderer } from "./PhoneNumber";
import { RadioGroupRenderer } from "./RadioGroup";
import { RemoteDropdownRenderer } from "./RemoteDropdown";
import { ShortTextRenderer } from "./ShortText";
import { SliderRenderer } from "./Slider";
import { SwitchRenderer } from "./Switch";
import { SwitchGroupRenderer } from "./SwitchGroup";
import { TimeRenderer } from "./Time";

type InputRendererProps<Meta> = RenderInputResult<Meta> & {
  onChangeValue(value: unknown): unknown;
};

export const InputRenderer = React.memo(function InputRenderer<Meta>(
  props: InputRendererProps<Meta>,
): React.ReactElement {
  const { onBlur } = React.useContext(FieldContext);
  return renderInput({ ...props, onBlur } as RenderInputProps<Meta>);
});

type RenderInputProps<Meta> = RenderInputResult<Meta> & {
  onChangeValue(value: unknown): unknown;
  onBlur(): unknown;
};

export function renderInput<Meta>(props: RenderInputProps<Meta>): React.ReactElement {
  switch (props.type) {
    case "ButtonGroup":
      return <ButtonGroupRenderer {...props} />;
    case "Checkbox":
      return <CheckboxRenderer {...props} />;
    case "CheckboxGroup":
      return <CheckboxGroupRenderer {...props} />;
    case "Computed":
      return <ComputedRenderer {...props} />;
    case "Date":
      return <DateRenderer {...props} />;
    case "DateTime":
      return <DateTimeRenderer {...props} />;
    case "RemoteDropdown":
      return <RemoteDropdownRenderer {...props} />;
    case "Dropdown":
      return <DropdownRenderer {...props} />;
    case "Email":
      return <EmailRenderer {...props} />;
    case "LongText":
      return <LongTextRenderer {...props} />;
    case "MultiSelect":
      return <MultiSelectRenderer {...props} />;
    case "Number":
      return <NumberRenderer {...props} />;
    case "Password":
      return <PasswordRenderer {...props} />;
    case "PhoneNumber":
      return <PhoneNumberRenderer {...props} />;
    case "RadioGroup":
      return <RadioGroupRenderer {...props} />;
    case "ShortText":
      return <ShortTextRenderer {...props} />;
    case "Slider":
      return <SliderRenderer {...props} />;
    case "Switch":
      return <SwitchRenderer {...props} />;
    case "SwitchGroup":
      return <SwitchGroupRenderer {...props} />;
    case "Time":
      return <TimeRenderer {...props} />;
  }
}
