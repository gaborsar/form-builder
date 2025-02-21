import type { ErrorMessageMap } from "./IntlUtils";
import type { RenderOptions, RenderResult } from "./Schema";
import { isNull, isString, isUndefined, orNull } from "./TypeUtils";
import { ValidationErrorFactory } from "./ValidationUtils";

export interface TextOptions<Meta> extends TextValidationOptions {
  meta?: Meta;
  errorMessages?: ErrorMessageMap;
}

export interface RenderTextResult<Meta> extends RenderResult<Meta>, TextValidationOptions {
  name: string;
}

interface TextValidationOptions {
  required?: boolean;
  defaultValue?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

export class TextSchema<Meta> {
  protected _meta: Meta | null;
  protected _required: boolean | null;
  protected _defaultValue: string | null;
  protected _minLength: number | null;
  protected _maxLength: number | null;
  protected _pattern: string | null;
  protected _errorMessages: ErrorMessageMap;

  constructor({
    meta,
    required,
    defaultValue,
    minLength,
    maxLength,
    pattern,
    errorMessages = {},
  }: TextOptions<Meta>) {
    this._meta = orNull(meta);
    this._required = orNull(required);
    this._defaultValue = orNull(defaultValue);
    this._minLength = orNull(minLength);
    this._maxLength = orNull(maxLength);
    this._pattern = orNull(pattern);
    this._errorMessages = errorMessages;
  }

  protected async _render(options: RenderOptions<Meta>): Promise<RenderTextResult<Meta>> {
    const { fixValue = true, locale, namePrefix, value: unsafeValue } = options;

    const errorFactory = new ValidationErrorFactory(locale, {
      ...options.errorMessages,
      ...this._errorMessages,
    });

    const result: RenderTextResult<Meta> = {
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
    if (this._minLength !== null) {
      result.minLength = this._minLength;
    }
    if (this._maxLength !== null) {
      result.maxLength = this._maxLength;
    }
    if (this._pattern !== null) {
      result.pattern = this._pattern;
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
    if (this._minLength !== null && result.value.length < this._minLength) {
      return errorFactory.wrapWithError(result, "MinLength", {
        minLength: this._minLength,
      });
    }
    if (this._maxLength !== null && result.value.length > this._maxLength) {
      return errorFactory.wrapWithError(result, "MaxLength", {
        maxLength: this._maxLength,
      });
    }
    if (this._pattern !== null && !new RegExp(this._pattern).test(result.value)) {
      return errorFactory.wrapWithError(result, "Pattern", {
        pattern: this._pattern,
      });
    }

    return result;
  }
}

function isEmpty(value: unknown): boolean {
  return isUndefined(value) || isNull(value) || value === "";
}
