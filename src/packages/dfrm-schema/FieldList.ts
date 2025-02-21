import { assoc, dissoc, equals, update } from "ramda";
import { isEmptyResult } from "./Empty";
import type { RenderInputResult } from "./Input";
import {
  type ErrorMessageMap,
  type LocalizedMessageMap,
  type MessageMap,
  localizeMessage,
} from "./IntlUtils";
import type { RenderOptions, RenderResult, Schema } from "./Schema";
import { isArray, isObject, orNull } from "./TypeUtils";
import { ValidationErrorFactory } from "./ValidationUtils";

export interface FieldListOptions<Meta> extends FieldListValidationOptions {
  meta?: Meta;
  key: string;
  label: LocalizedMessageMap;
  messages?: MessageMap;
  errorMessages?: ErrorMessageMap;
  child: FieldListChildSchema<Meta>;
}

export interface RenderFieldListResult<Meta>
  extends RenderResult<Meta>,
    FieldListValidationOptions {
  type: "FieldList";
  key: string;
  emptyLabel: string;
  appendMessage: string;
  children?: RenderFieldListItemResult<Meta>[];
}

export interface RenderFieldListItemResult<Meta> extends RenderResult<Meta> {
  type: "FieldListItem";
  index: number;
  label: string;
  child?: RenderInputResult<Meta>;
}

export type FieldListChildSchema<Meta> = Schema<Meta, RenderInputResult<Meta>>;

interface FieldListValidationOptions {
  minLength?: number;
  maxLength?: number;
  unique?: boolean;
}

export class FieldListSchema<Meta> implements Schema<Meta, RenderFieldListResult<Meta>> {
  private _meta: Meta | null;
  private _key: string;
  private _label: LocalizedMessageMap;
  private _minLength: number | null;
  private _maxLength: number | null;
  private _unique: boolean | null;
  private _messages: MessageMap;
  private _errorMessages: ErrorMessageMap;
  private _child: FieldListChildSchema<Meta>;

  constructor({
    meta,
    key,
    label,
    minLength,
    maxLength,
    unique,
    messages = {},
    errorMessages = {},
    child,
  }: FieldListOptions<Meta>) {
    this._meta = orNull(meta);
    this._key = key;
    this._label = label;
    this._minLength = orNull(minLength);
    this._maxLength = orNull(maxLength);
    this._unique = orNull(unique);
    this._messages = messages;
    this._errorMessages = errorMessages;
    this._child = child;
  }

  async render(options: RenderOptions<Meta>): Promise<RenderFieldListResult<Meta>> {
    const key = this._key;

    const { fixValue = true, locale, path, namePrefix, value: unsafeValue } = options;

    if (!isObject(unsafeValue)) {
      throw new Error();
    }

    let value = unsafeValue;

    const label = localizeMessage(this._label, locale);

    const errorFactory = new ValidationErrorFactory(locale, {
      ...options.errorMessages,
      ...this._errorMessages,
    });

    const messages = {
      ...options.messages,
      ...this._messages,
    };

    let result: RenderFieldListResult<Meta> = {
      type: "FieldList",
      key,
      emptyLabel: `1. ${label}`,
      appendMessage: "",
      value,
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
    if (this._unique !== null) {
      result.unique = this._unique;
    }

    const unsafeProperty = value[key];
    let property: unknown[];

    if (fixValue) {
      if (isArray(unsafeProperty)) {
        property = unsafeProperty;
      } else {
        property = [];
      }
      if (this._minLength !== null && property.length < this._minLength) {
        property = property.slice();
        for (let i = property.length; i < this._minLength; i++) {
          property.push(undefined);
        }
      }
      if (this._maxLength !== null && property.length > this._maxLength) {
        property = property.slice(0, this._maxLength);
      }
      if (this._unique === true) {
        const fixedProperty = property.filter(
          (v1, i) => property.findIndex((v2) => equals(v1, v2)) === i,
        );
        if (fixedProperty.length < property.length) {
          property = fixedProperty;
        }
      }
    } else {
      if (!isArray(unsafeProperty)) {
        return errorFactory.wrapWithError(result, "InvalidType", {
          expectedType: "array",
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
      if (this._unique === true) {
        const fixedProperty = unsafeProperty.filter(
          (v1, i) => unsafeProperty.findIndex((v2) => equals(v1, v2)) === i,
        );
        if (fixedProperty.length < unsafeProperty.length) {
          result = errorFactory.wrapWithError(result, "Unique");
        }
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

    const items: RenderFieldListItemResult<Meta>[] = [];
    for (let index = 0, l = property.length; index < l; index++) {
      const childPath = path.concat(key).concat(index);
      const childNamePrefix =
        namePrefix === "" ? `${key}-${index}` : `${namePrefix}-${key}-${index}`;
      const childResult = await this._child.render({
        ...options,
        path: childPath,
        namePrefix: childNamePrefix,
        value: property[index],
      });
      if (property[index] !== childResult.value) {
        property = update(index, childResult.value, property);
      }
      if (!isEmptyResult(childResult)) {
        items.push({
          type: "FieldListItem",
          index,
          label: `${index + 1}. ${label}`,
          value: property[index],
          isValid: childResult.isValid,
          child: childResult,
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
      isValid: result.isValid && items.every((item) => item.isValid),
      children: items,
    };
  }
}
