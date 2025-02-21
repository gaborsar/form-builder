import { type ErrorMessageMap, localizeMessage } from "./IntlUtils";
import type { Option, RenderOptionResult } from "./Option";
import type { RenderOptions, RenderResult, Schema } from "./Schema";
import { isNull, isString, isUndefined, orNull } from "./TypeUtils";
import { ValidationErrorFactory } from "./ValidationUtils";

export interface SliderOptions<Meta> extends SliderValidationOptions {
  meta?: Meta;
  options?: Option<Meta>[];
  errorMessages?: ErrorMessageMap;
}

export interface RenderSliderResult<Meta> extends RenderResult<Meta>, SliderValidationOptions {
  type: "Slider";
  name: string;
  options: RenderOptionResult<Meta>[];
}

interface SliderValidationOptions {
  required?: boolean;
  defaultValue?: string;
  transferOptionMetaToParent?: boolean;
}

export class SliderSchema<Meta> implements Schema<Meta, RenderSliderResult<Meta>> {
  private _meta: Meta | null;
  private _required: boolean | null;
  private _defaultValue: string | null;
  private _options: Option<Meta>[];
  private _errorMessages: ErrorMessageMap;

  constructor({
    meta,
    required,
    defaultValue,
    options = [],
    errorMessages = {},
  }: SliderOptions<Meta>) {
    this._meta = orNull(meta);
    this._required = orNull(required);
    this._defaultValue = orNull(defaultValue);
    this._options = options;
    this._errorMessages = errorMessages;
  }

  async render(options: RenderOptions<Meta>): Promise<RenderSliderResult<Meta>> {
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

    const result: RenderSliderResult<Meta> = {
      type: "Slider",
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
      if (isUndefined(result.value) || !allowedValues.includes(result.value)) {
        if (this._defaultValue === null && this._options.length !== 0) {
          result.value = this._options[0].value;
        } else {
          result.value = this._defaultValue;
        }
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
    if (!allowedValues.includes(result.value)) {
      return errorFactory.wrapWithError(result, "InvalidValue", {
        values: allowedValues,
      });
    }

    return result;
  }
}

function isEmpty(value: unknown): boolean {
  return isUndefined(value) || isNull(value) || value === "";
}
