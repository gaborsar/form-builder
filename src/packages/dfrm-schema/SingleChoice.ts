import { type ErrorMessageMap, localizeMessage } from "./IntlUtils";
import type { Option, RenderOptionResult } from "./Option";
import type { RenderOptions, RenderResult } from "./Schema";
import { isNull, isString, isUndefined, orNull } from "./TypeUtils";
import { ValidationErrorFactory } from "./ValidationUtils";

export interface SingleChoiceOptions<Meta> extends SingleChoiceValidationOptions {
  meta?: Meta;
  options?: Option<Meta>[];
  errorMessages?: ErrorMessageMap;
}

export interface RenderSingleChoiceResult<Meta>
  extends RenderResult<Meta>,
    SingleChoiceValidationOptions {
  name: string;
  options: RenderOptionResult<Meta>[];
}

interface SingleChoiceValidationOptions {
  required?: boolean;
  defaultValue?: string;
  transferOptionMetaToParent?: boolean;
}

export class SingleChoiceSchema<Meta> {
  protected _meta: Meta | null;
  protected _required: boolean | null;
  protected _defaultValue: string | null;
  protected _options: Option<Meta>[];
  protected _errorMessages: ErrorMessageMap;

  constructor({
    meta,
    required,
    defaultValue,
    options = [],
    errorMessages = {},
  }: SingleChoiceOptions<Meta>) {
    this._meta = orNull(meta);
    this._required = orNull(required);
    this._defaultValue = orNull(defaultValue);
    this._options = options;
    this._errorMessages = errorMessages;
  }

  protected async _render(options: RenderOptions<Meta>): Promise<RenderSingleChoiceResult<Meta>> {
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

    const result: RenderSingleChoiceResult<Meta> = {
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
