import { type ButtonGroupOptions, ButtonGroupSchema } from "./ButtonGroup";
import { type CheckboxOptions, CheckboxSchema } from "./Checkbox";
import { type CheckboxGroupOptions, CheckboxGroupSchema } from "./CheckboxGroup";
import { type ColumnChildSchema, type ColumnOptions, ColumnSchema } from "./Column";
import { type ComputedOptions, ComputedSchema } from "./Computed";
import { type ConditionalOptions, ConditionalSchema } from "./Conditional";
import { type DateOptions, DateSchema } from "./Date";
import { type DateTimeOptions, DateTimeSchema } from "./DateTime";
import { type DropdownOptions, DropdownSchema } from "./Dropdown";
import { type EmailOptions, EmailSchema } from "./Email";
import { type FieldChildSchema, type FieldOptions, FieldSchema } from "./Field";
import {
  type FieldGroupListChildSchema,
  type FieldGroupListOptions,
  FieldGroupListSchema,
} from "./FieldGroupList";
import { type FieldListChildSchema, type FieldListOptions, FieldListSchema } from "./FieldList";
import { type FieldsetChildSchema, type FieldsetOptions, FieldsetSchema } from "./Fieldset";
import { type FormChildSchema, type FormOptions, FormSchema } from "./Form";
import { type LongTextOptions, LongTextSchema } from "./LongText";
import { type MultiSelectOptions, MultiSelectSchema } from "./MultiSelect";
import { type NumberOptions, NumberSchema } from "./Number";
import { type ObjectChildSchema, type ObjectOptions, ObjectSchema } from "./Object";
import { type PasswordOptions, PasswordSchema } from "./Password";
import { type PhoneNumberOptions, PhoneNumberSchema } from "./PhoneNumber";
import { type RadioGroupOptions, RadioGroupSchema } from "./RadioGroup";
import { type RemoteDropdownOptions, RemoteDropdownSchema } from "./RemoteDropdown";
import { type RowChildSchema, type RowOptions, RowSchema } from "./Row";
import type { RenderResult, Schema } from "./Schema";
import { type ShortTextOptions, ShortTextSchema } from "./ShortText";
import { type SliderOptions, SliderSchema } from "./Slider";
import { type SwitchOptions, SwitchSchema } from "./Switch";
import { type SwitchGroupOptions, SwitchGroupSchema } from "./SwitchGroup";
import { type TimeOptions, TimeSchema } from "./Time";

export type CreateSchemaOptions<Meta> =
  | CreateConditionalOptions<Meta>
  | CreateFormOptions<Meta>
  | CreateFieldsetOptions<Meta>
  | CreateRowOptions<Meta>
  | CreateColumnOptions<Meta>
  | CreateObjectOptions<Meta>
  | CreateFieldGroupListOptions<Meta>
  | CreateFieldListOptions<Meta>
  | CreateFieldOptions<Meta>
  | CreateButtonGroupOptions<Meta>
  | CreateCheckboxOptions<Meta>
  | CreateCheckboxGroupOptions<Meta>
  | CreateComputedOptions<Meta>
  | CreateDateOptions<Meta>
  | CreateDateTimeOptions<Meta>
  | CreateRemoteDropdownOptions<Meta>
  | CreateDropdownOptions<Meta>
  | CreateEmailOptions<Meta>
  | CreateLongTextOptions<Meta>
  | CreateMultiSelectOptions<Meta>
  | CreateNumberOptions<Meta>
  | CreatePasswordOptions<Meta>
  | CreatePhoneNumberOptions<Meta>
  | CreateRadioGroupOptions<Meta>
  | CreateShortTextOptions<Meta>
  | CreateSliderOptions<Meta>
  | CreateSwitchOptions<Meta>
  | CreateSwitchGroupOptions<Meta>
  | CreateTimeOptions<Meta>;

export interface CreateConditionalOptions<Meta>
  extends Omit<ConditionalOptions<Meta, RenderResult<Meta>>, "then" | "else"> {
  type: "Conditional";
  then: CreateSchemaOptions<Meta>;
  else?: CreateSchemaOptions<Meta>;
}

export interface CreateFormOptions<Meta> extends Omit<FormOptions<Meta>, "children"> {
  type: "Form";
  children: CreateSchemaOptions<Meta>[];
}

export interface CreateFieldsetOptions<Meta> extends Omit<FieldsetOptions<Meta>, "children"> {
  type: "Fieldset";
  children: CreateSchemaOptions<Meta>[];
}

export interface CreateRowOptions<Meta> extends Omit<RowOptions<Meta>, "children"> {
  type: "Row";
  children: CreateSchemaOptions<Meta>[];
}

export interface CreateColumnOptions<Meta> extends Omit<ColumnOptions<Meta>, "child"> {
  type: "Column";
  child: CreateSchemaOptions<Meta>;
}

export interface CreateObjectOptions<Meta> extends Omit<ObjectOptions<Meta>, "children"> {
  type: "Object";
  children: CreateSchemaOptions<Meta>[];
}

export interface CreateFieldGroupListOptions<Meta>
  extends Omit<FieldGroupListOptions<Meta>, "children"> {
  type: "FieldGroupList";
  children: CreateSchemaOptions<Meta>[];
}

export interface CreateFieldListOptions<Meta> extends Omit<FieldListOptions<Meta>, "child"> {
  type: "FieldList";
  child: CreateSchemaOptions<Meta>;
}

export interface CreateFieldOptions<Meta> extends Omit<FieldOptions<Meta>, "child"> {
  type: "Field";
  child: CreateSchemaOptions<Meta>;
}

export interface CreateButtonGroupOptions<Meta> extends ButtonGroupOptions<Meta> {
  type: "ButtonGroup";
}

export interface CreateCheckboxOptions<Meta> extends CheckboxOptions<Meta> {
  type: "Checkbox";
}

export interface CreateCheckboxGroupOptions<Meta> extends CheckboxGroupOptions<Meta> {
  type: "CheckboxGroup";
}

export interface CreateComputedOptions<Meta> extends ComputedOptions<Meta> {
  type: "Computed";
}

export interface CreateDateOptions<Meta> extends DateOptions<Meta> {
  type: "Date";
}

export interface CreateDateTimeOptions<Meta> extends DateTimeOptions<Meta> {
  type: "DateTime";
}

export interface CreateRemoteDropdownOptions<Meta> extends RemoteDropdownOptions<Meta> {
  type: "RemoteDropdown";
}

export interface CreateDropdownOptions<Meta> extends DropdownOptions<Meta> {
  type: "Dropdown";
}

export interface CreateEmailOptions<Meta> extends EmailOptions<Meta> {
  type: "Email";
}

export interface CreateLongTextOptions<Meta> extends LongTextOptions<Meta> {
  type: "LongText";
}

export interface CreateMultiSelectOptions<Meta> extends MultiSelectOptions<Meta> {
  type: "MultiSelect";
}

export interface CreateNumberOptions<Meta> extends NumberOptions<Meta> {
  type: "Number";
}

export interface CreatePasswordOptions<Meta> extends PasswordOptions<Meta> {
  type: "Password";
}

export interface CreatePhoneNumberOptions<Meta> extends PhoneNumberOptions<Meta> {
  type: "PhoneNumber";
}

export interface CreateRadioGroupOptions<Meta> extends RadioGroupOptions<Meta> {
  type: "RadioGroup";
}

export interface CreateShortTextOptions<Meta> extends ShortTextOptions<Meta> {
  type: "ShortText";
}

export interface CreateSliderOptions<Meta> extends SliderOptions<Meta> {
  type: "Slider";
}

export interface CreateSwitchOptions<Meta> extends SwitchOptions<Meta> {
  type: "Switch";
}

export interface CreateSwitchGroupOptions<Meta> extends SwitchGroupOptions<Meta> {
  type: "SwitchGroup";
}

export interface CreateTimeOptions<Meta> extends TimeOptions<Meta> {
  type: "Time";
}

export function createSchema<Meta>(
  options: CreateSchemaOptions<Meta>,
): Schema<Meta, RenderResult<Meta>> {
  switch (options.type) {
    case "Conditional":
      return new ConditionalSchema({
        ...options,
        then: createSchema(options.then),
        else: options.else === undefined ? undefined : createSchema(options.else),
      });
    case "Form":
      return new FormSchema({
        ...options,
        children: options.children.map(createSchema) as FormChildSchema<Meta>[],
      });
    case "Fieldset":
      return new FieldsetSchema({
        ...options,
        children: options.children.map(createSchema) as FieldsetChildSchema<Meta>[],
      });
    case "Row":
      return new RowSchema({
        ...options,
        children: options.children.map(createSchema) as RowChildSchema<Meta>[],
      });
    case "Column":
      return new ColumnSchema({
        ...options,
        child: createSchema(options.child) as ColumnChildSchema<Meta>,
      });
    case "Object":
      return new ObjectSchema({
        ...options,
        children: options.children.map(createSchema) as ObjectChildSchema<Meta>[],
      });
    case "FieldGroupList":
      return new FieldGroupListSchema({
        ...options,
        children: options.children.map(createSchema) as FieldGroupListChildSchema<Meta>[],
      });
    case "FieldList":
      return new FieldListSchema({
        ...options,
        child: createSchema(options.child) as FieldListChildSchema<Meta>,
      });
    case "Field":
      return new FieldSchema({
        ...options,
        child: createSchema(options.child) as FieldChildSchema<Meta>,
      });
    case "ButtonGroup":
      return new ButtonGroupSchema(options);
    case "Checkbox":
      return new CheckboxSchema(options);
    case "CheckboxGroup":
      return new CheckboxGroupSchema(options);
    case "Computed":
      return new ComputedSchema(options);
    case "Date":
      return new DateSchema(options);
    case "DateTime":
      return new DateTimeSchema(options);
    case "RemoteDropdown":
      return new RemoteDropdownSchema(options);
    case "Dropdown":
      return new DropdownSchema(options);
    case "Email":
      return new EmailSchema(options);
    case "LongText":
      return new LongTextSchema(options);
    case "MultiSelect":
      return new MultiSelectSchema(options);
    case "Number":
      return new NumberSchema(options);
    case "Password":
      return new PasswordSchema(options);
    case "PhoneNumber":
      return new PhoneNumberSchema(options);
    case "RadioGroup":
      return new RadioGroupSchema(options);
    case "ShortText":
      return new ShortTextSchema(options);
    case "Slider":
      return new SliderSchema(options);
    case "Switch":
      return new SwitchSchema(options);
    case "SwitchGroup":
      return new SwitchGroupSchema(options);
    case "Time":
      return new TimeSchema(options);
  }
}
