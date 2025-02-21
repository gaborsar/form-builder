import { assoc, dissoc, update } from "ramda";
import type { ConditionalSchema } from "./Conditional";
import { type EmptyResult, isEmptyResult } from "./Empty";
import {
  type ErrorMessageMap,
  type LocalizedMessageMap,
  type MessageMap,
  localizeMessage,
} from "./IntlUtils";
import type { RenderRowResult } from "./Row";
import type { RenderOptions, RenderResult, Schema } from "./Schema";
import { isObject, orNull } from "./TypeUtils";
import { ValidationErrorFactory } from "./ValidationUtils";

export interface FieldGroupListOptions<Meta> extends FieldGroupListValidationOptions {
  meta?: Meta;
  key: string;
  label: LocalizedMessageMap;
  messages?: MessageMap;
  errorMessages?: ErrorMessageMap;
  children: FieldGroupListChildSchema<Meta>[];
}

export interface RenderFieldGroupListResult<Meta>
  extends RenderResult<Meta>,
    FieldGroupListValidationOptions {
  type: "FieldGroupList";
  key: string;
  emptyLabel: string;
  appendMessage: string;
  children?: RenderFieldGroupListItemResult<Meta>[];
}

export interface RenderFieldGroupListItemResult<Meta> extends RenderResult<Meta> {
  type: "FieldGroupListItem";
  index: number;
  label: string;
  children?: RenderRowResult<Meta>[];
}

export type FieldGroupListChildSchema<Meta> =
  | ConditionalSchema<Meta, RenderRowResult<Meta> | EmptyResult<Meta>>
  | Schema<Meta, RenderRowResult<Meta> | EmptyResult<Meta>>;

interface FieldGroupListValidationOptions {
  minLength?: number;
  maxLength?: number;
}

export class FieldGroupListSchema<Meta> implements Schema<Meta, RenderFieldGroupListResult<Meta>> {
  private _meta: Meta | null;
  private _key: string;
  private _label: LocalizedMessageMap;
  private _minLength: number | null;
  private _maxLength: number | null;
  private _messages: MessageMap;
  private _errorMessages: ErrorMessageMap;
  private _children: FieldGroupListChildSchema<Meta>[];

  constructor({
    meta,
    key,
    label,
    minLength,
    maxLength,
    messages = {},
    errorMessages = {},
    children,
  }: FieldGroupListOptions<Meta>) {
    this._meta = orNull(meta);
    this._key = key;
    this._label = label;
    this._minLength = orNull(minLength);
    this._maxLength = orNull(maxLength);
    this._messages = messages;
    this._errorMessages = errorMessages;
    this._children = children;
  }

  async render(options: RenderOptions<Meta>): Promise<RenderFieldGroupListResult<Meta>> {
    const key = this._key;
    const { fixValue = true, locale, path, namePrefix, value: unsafeValue } = options;

    if (!isObject(unsafeValue)) {
      throw new Error();
    }

    let value = unsafeValue;

    const label = localizeMessage(this._label, locale);

    const messages = {
      ...options.messages,
      ...this._messages,
    };
    const errorFactory = new ValidationErrorFactory(locale, {
      ...options.errorMessages,
      ...this._errorMessages,
    });

    let result: RenderFieldGroupListResult<Meta> = {
      type: "FieldGroupList",
      key,
      emptyLabel: `1. ${label}`,
      appendMessage: "",
      value: unsafeValue,
      isValid: true,
    };
    if (this._meta !== null) {
      result.meta = this._meta;
    }
    if (messages.append !== undefined) {
      result.appendMessage = localizeMessage(messages.append, locale);
    }
    if (this._minLength !== null) {
      result.minLength = this._minLength;
    }
    if (this._maxLength !== null) {
      result.maxLength = this._maxLength;
    }

    const unsafeProperty = value[key];
    let property: { [key: string]: unknown }[];

    if (fixValue) {
      if (Array.isArray(unsafeProperty)) {
        if (unsafeProperty.every(isObject)) {
          property = unsafeProperty;
        } else {
          property = unsafeProperty.filter(isObject);
        }
      } else {
        property = [];
      }
      if (this._minLength !== null && property.length < this._minLength) {
        property = property.slice();
        for (let i = property.length; i < this._minLength; i++) {
          property.push({});
        }
      }
      if (this._maxLength !== null && property.length > this._maxLength) {
        property = property.slice(0, this._maxLength);
      }
    } else {
      if (!Array.isArray(unsafeProperty)) {
        return errorFactory.wrapWithError(result, "InvalidType", {
          expectedType: "array",
        });
      }
      if (!unsafeProperty.every(isObject)) {
        return errorFactory.wrapWithError(result, "InvalidItemType", {
          expectedType: "object",
        });
      }
      if (this._minLength !== null && unsafeProperty.length < this._minLength) {
        result = errorFactory.wrapWithError(result, "MinLength", {
          minLength: this._minLength,
        });
      }
      if (this._maxLength !== null && unsafeProperty.length > this._maxLength) {
        result = errorFactory.wrapWithError(result, "MaxLength", {
          maxLength: this._maxLength,
        });
      }
      property = unsafeProperty;
    }

    if (value[key] !== property) {
      if (property === undefined) {
        value = dissoc(key, value);
      } else {
        value = assoc(key, property, value);
      }
      result = { ...result, value };
    }

    const items: RenderFieldGroupListItemResult<Meta>[] = [];
    for (let index = 0, l = property.length; index < l; index++) {
      const children: RenderRowResult<Meta>[] = [];
      const childPath = path.concat(key).concat(index);
      const childNamePrefix =
        namePrefix === "" ? `${key}-${index}` : `${namePrefix}-${key}-${index}`;
      for (const child of this._children) {
        const childResult = await child.render({
          ...options,
          path: childPath,
          namePrefix: childNamePrefix,
          value: property[index],
        });
        if (isObject(childResult.value) && property[index] !== childResult.value) {
          property = update(index, childResult.value, property);
        }
        if (!isEmptyResult(childResult)) {
          children.push(childResult);
        }
      }
      if (children.length !== 0) {
        items.push({
          type: "FieldGroupListItem",
          index,
          label: `${index + 1}. ${label}`,
          value: property[index],
          isValid: children.every((child) => child.isValid),
          children,
        });
      }
    }

    if (value[key] !== property) {
      if (property === undefined) {
        value = dissoc(key, value);
      } else {
        value = assoc(key, property, value);
      }
      result = { ...result, value };
    }

    return {
      ...result,
      value,
      isValid: result.isValid && items.every((item) => item.isValid),
      children: items,
    };
  }
}
