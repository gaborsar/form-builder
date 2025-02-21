import type { ErrorMessageMap } from "./IntlUtils";
import type { RenderOptions, RenderResult, Schema } from "./Schema";
import { isNull, isString, isUndefined, orNull } from "./TypeUtils";
import { ValidationErrorFactory } from "./ValidationUtils";

const PATTERN_TIME = /^\d{2}:\d{2}(:\d{2})?$/;

export interface TimeOptions<Meta> extends TimeValidationOptions {
  meta?: Meta;
  errorMessages?: ErrorMessageMap;
}

export interface RenderTimeResult<Meta> extends RenderResult<Meta>, TimeValidationOptions {
  type: "Time";
  name: string;
}

interface TimeValidationOptions {
  required?: boolean;
  defaultValue?: string;
}

export class TimeSchema<Meta> implements Schema<Meta, RenderTimeResult<Meta>> {
  private _meta: Meta | null;
  private _required: boolean | null;
  private _defaultValue: string | null;
  private _errorMessages: ErrorMessageMap;

  constructor({ meta, required, defaultValue, errorMessages = {} }: TimeOptions<Meta>) {
    this._meta = orNull(meta);
    this._required = orNull(required);
    this._defaultValue = orNull(defaultValue);
    this._errorMessages = errorMessages;
  }

  async render(options: RenderOptions<Meta>): Promise<RenderTimeResult<Meta>> {
    const { fixValue = true, locale, namePrefix, value: unsafeValue } = options;

    const errorFactory = new ValidationErrorFactory(locale, {
      ...options.errorMessages,
      ...this._errorMessages,
    });

    const result: RenderTimeResult<Meta> = {
      type: "Time",
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
      if (isUndefined(result.value) || !isString(result.value) || !isTimeString(result.value)) {
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
    if (!isTimeString(result.value)) {
      return errorFactory.wrapWithError(result, "InvalidFormat", {
        expectedFormat: "time",
      });
    }

    return result;
  }
}

function isEmpty(value: unknown): boolean {
  return isUndefined(value) || isNull(value) || value === "";
}

function isTimeString(value: string): boolean {
  return PATTERN_TIME.test(value);
}
