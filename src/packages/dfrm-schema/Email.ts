import type { ErrorMessageMap } from "./IntlUtils";
import type { RenderOptions, RenderResult, Schema } from "./Schema";
import { isNull, isString, isUndefined, orNull } from "./TypeUtils";
import { ValidationErrorFactory } from "./ValidationUtils";

const PATTERN_EMAIL =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]+$/;

export interface EmailOptions<Meta> extends EmailValidationOptions {
  meta?: Meta;
  errorMessages?: ErrorMessageMap;
}

export interface RenderEmailResult<Meta> extends RenderResult<Meta>, EmailValidationOptions {
  type: "Email";
  name: string;
}

interface EmailValidationOptions {
  required?: boolean;
  defaultValue?: string;
}

export class EmailSchema<Meta> implements Schema<Meta, RenderEmailResult<Meta>> {
  private _meta: Meta | null;
  private _required: boolean | null;
  private _defaultValue: string | null;
  private _errorMessages: ErrorMessageMap;

  constructor({ meta, required, defaultValue, errorMessages = {} }: EmailOptions<Meta>) {
    this._meta = orNull(meta);
    this._required = orNull(required);
    this._defaultValue = orNull(defaultValue);
    this._errorMessages = errorMessages;
  }

  async render(options: RenderOptions<Meta>): Promise<RenderEmailResult<Meta>> {
    const { fixValue = true, locale, namePrefix, value: unsafeValue } = options;

    const errorFactory = new ValidationErrorFactory(locale, {
      ...options.errorMessages,
      ...this._errorMessages,
    });

    const result: RenderEmailResult<Meta> = {
      type: "Email",
      name: namePrefix,
      value: unsafeValue,
      isValid: true,
    };
    if (this._meta !== null) {
      result.meta = this._meta;
    }
    if (this._required !== null) {
      result.required = this._required;
    }
    if (this._defaultValue !== null) {
      result.defaultValue = this._defaultValue;
    }

    if (fixValue && !isNull(result.value)) {
      if (isUndefined(result.value) || !isString(result.value)) {
        result.value = this._defaultValue;
      }
    }

    if (isEmpty(result.value)) {
      return this._required === true ? errorFactory.wrapWithError(result, "Required") : result;
    }

    if (!isString(result.value)) {
      return errorFactory.wrapWithError(result, "InvalidType", {
        expectedType: "string",
      });
    }
    if (!isEmailString(result.value)) {
      return errorFactory.wrapWithError(result, "InvalidFormat", {
        expectedFormat: "email",
      });
    }

    return result;
  }
}

function isEmpty(value: unknown): boolean {
  return isUndefined(value) || isNull(value) || value === "";
}

function isEmailString(value: string): boolean {
  return PATTERN_EMAIL.test(value);
}
