import { type ErrorMessageMap, localizeMessage } from "./IntlUtils";
import type { Option, RenderOptionResult } from "./Option";
import type { RenderOptions, RenderResult } from "./Schema";
import { isArray, isNull, isString, isUndefined, orNull } from "./TypeUtils";
import { ValidationErrorFactory } from "./ValidationUtils";

export interface MultiChoiceOptions<Meta> extends MultiChoiceValidationOptions {
  meta?: Meta;
  options?: Option<Meta>[];
  errorMessages?: ErrorMessageMap;
}

export interface RenderMultiChoiceResult<Meta>
  extends RenderResult<Meta>,
    MultiChoiceValidationOptions {
  name: string;
  options: RenderOptionResult<Meta>[];
}

interface MultiChoiceValidationOptions {
  required?: boolean;
  defaultValue?: string[];
}

export class MultiChoiceSchema<Meta> {
  protected _meta: Meta | null;
  protected _required: boolean | null;
  protected _defaultValue: string[] | null;
  protected _options: Option<Meta>[];
  protected _errorMessages: ErrorMessageMap;

  constructor({
    meta,
    required,
    defaultValue,
    options = [],
    errorMessages = {},
  }: MultiChoiceOptions<Meta>) {
    this._meta = orNull(meta);
    this._required = orNull(required);
    this._defaultValue = orNull(defaultValue);
    this._options = options;
    this._errorMessages = errorMessages;
  }

  protected async _render(options: RenderOptions<Meta>): Promise<RenderMultiChoiceResult<Meta>> {
    const { fixValue = true, locale, namePrefix, value: unsafeValue } = options;

    const errorFactory = new ValidationErrorFactory(locale, {
      ...options.errorMessages,
      ...this._errorMessages,
    });

    const renderedOptions = this._options.map(({ label, ...rest }) => ({
      ...rest,
      label: localizeMessage(label, locale),
    }));

    const allowedValues: unknown[] = this._options.map(({ value }) => value);

    const result: RenderMultiChoiceResult<Meta> = {
      name: namePrefix,
      options: renderedOptions,
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
      if (isUndefined(result.value) || !isArray(result.value)) {
        result.value = this._defaultValue;
      }
      if (isArray(result.value) && !result.value.every((value) => allowedValues.includes(value))) {
        result.value = result.value.filter((value) => allowedValues.includes(value));
      }
    }

    if (isEmpty(result.value)) {
      return this._required === true ? errorFactory.wrapWithError(result, "Required") : result;
    }

    if (!Array.isArray(result.value)) {
      return errorFactory.wrapWithError(result, "InvalidType", {
        expectedType: "array",
      });
    }

    if (result.value.length === 0 && this._required === true) {
      return errorFactory.wrapWithError(result, "Required");
    }

    for (const value of result.value) {
      if (!isString(value)) {
        return errorFactory.wrapWithError(result, "InvalidItemType", {
          expectedType: "string",
        });
      }
    }

    for (const value of result.value) {
      if (!allowedValues.includes(value)) {
        return errorFactory.wrapWithError(result, "InvalidValue", {
          values: allowedValues,
        });
      }
    }

    return result;
  }
}

function isEmpty(value: unknown): boolean {
  return isUndefined(value) || isNull(value);
}
