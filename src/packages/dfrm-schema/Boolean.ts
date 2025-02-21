import type { ErrorMessageMap } from "./IntlUtils";
import type { RenderOptions, RenderResult } from "./Schema";
import { isBoolean, isNull, isUndefined, orNull } from "./TypeUtils";
import { ValidationErrorFactory } from "./ValidationUtils";

export interface BooleanOptions<Meta> extends BooleanValidationOptions {
  meta?: Meta;
  errorMessages?: ErrorMessageMap;
}

export interface RenderBooleanResult<Meta> extends RenderResult<Meta>, BooleanValidationOptions {
  name: string;
}

interface BooleanValidationOptions {
  required?: boolean;
  defaultValue?: boolean;
}

export class BooleanSchema<Meta> {
  private _meta: Meta | null;
  private _required: boolean | null;
  private _defaultValue: boolean | null;
  private _errorMessages: ErrorMessageMap;

  constructor({ meta, required, defaultValue, errorMessages = {} }: BooleanOptions<Meta>) {
    this._meta = orNull(meta);
    this._required = orNull(required);
    this._defaultValue = orNull(defaultValue);
    this._errorMessages = errorMessages;
  }

  protected async _render(options: RenderOptions<Meta>): Promise<RenderBooleanResult<Meta>> {
    const { fixValue = true, locale, namePrefix, value: unsafeValue } = options;

    const errorFactory = new ValidationErrorFactory(locale, {
      ...options.errorMessages,
      ...this._errorMessages,
    });

    const result: RenderBooleanResult<Meta> = {
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
      if (isEmpty(result.value) || !isBoolean(result.value)) {
        result.value = this._defaultValue;
      }
    }

    if (isEmpty(result.value)) {
      return this._required === true ? errorFactory.wrapWithError(result, "Required") : result;
    }

    if (!isBoolean(result.value)) {
      return errorFactory.wrapWithError(result, "InvalidType", {
        expectedType: "boolean",
      });
    }

    return result;
  }
}

function isEmpty(value: unknown): boolean {
  return isUndefined(value) || isNull(value);
}
