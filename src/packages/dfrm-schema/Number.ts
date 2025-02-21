import { type ErrorMessageMap, type LocalizedMessageMap, localizeMessage } from "./IntlUtils";
import type { RenderOptions, RenderResult, Schema } from "./Schema";
import { isNull, isNumber, isUndefined, orNull } from "./TypeUtils";
import { ValidationErrorFactory } from "./ValidationUtils";

export interface NumberOptions<Meta> extends NumberValidationOptions {
  meta?: Meta;
  unit?: LocalizedMessageMap;
  errorMessages?: ErrorMessageMap;
}

export interface RenderNumberResult<Meta> extends RenderResult<Meta>, NumberValidationOptions {
  type: "Number";
  name: string;
  originalUnit?: LocalizedMessageMap;
  unit?: string;
}

interface NumberValidationOptions {
  required?: boolean;
  defaultValue?: number;
  precision?: number;
  multipleOf?: number;
  min?: number;
  max?: number;
  minExclusive?: number;
  maxExclusive?: number;
}

export class NumberSchema<Meta> implements Schema<Meta, RenderNumberResult<Meta>> {
  private _meta: Meta | null;
  private _required: boolean | null;
  private _defaultValue: number | null;
  private _precision: number | null;
  private _multipleOf: number | null;
  private _min: number | null;
  private _max: number | null;
  private _minExclusive: number | null;
  private _maxExclusive: number | null;
  private _unit: LocalizedMessageMap | null;
  private _errorMessages: ErrorMessageMap;

  constructor({
    meta,
    required,
    defaultValue,
    precision,
    multipleOf,
    min,
    max,
    minExclusive,
    maxExclusive,
    unit,
    errorMessages = {},
  }: NumberOptions<Meta>) {
    this._meta = orNull(meta);
    this._required = orNull(required);
    this._defaultValue = orNull(defaultValue);
    this._precision = orNull(precision);
    this._multipleOf = orNull(multipleOf);
    this._min = orNull(min);
    this._max = orNull(max);
    this._minExclusive = orNull(minExclusive);
    this._maxExclusive = orNull(maxExclusive);
    this._unit = orNull(unit);
    this._errorMessages = errorMessages;
  }

  async render(options: RenderOptions<Meta>): Promise<RenderNumberResult<Meta>> {
    const { fixValue = true, locale, namePrefix, value: unsafeValue } = options;

    const errorFactory = new ValidationErrorFactory(locale, {
      ...options.errorMessages,
      ...this._errorMessages,
    });

    const result: RenderNumberResult<Meta> = {
      type: "Number",
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
    if (this._precision !== null) {
      result.precision = this._precision;
    }
    if (this._multipleOf !== null) {
      result.multipleOf = this._multipleOf;
    }
    if (this._min !== null) {
      result.min = this._min;
    }
    if (this._max !== null) {
      result.max = this._max;
    }
    if (this._minExclusive !== null) {
      result.minExclusive = this._minExclusive;
    }
    if (this._maxExclusive !== null) {
      result.maxExclusive = this._maxExclusive;
    }
    if (this._unit !== null) {
      result.originalUnit = this._unit;
      result.unit = localizeMessage(this._unit, locale);
    }

    if (fixValue && !isNull(result.value)) {
      if (isUndefined(result.value) || !isNumber(result.value)) {
        result.value = this._defaultValue;
      }
    }

    if (isEmpty(result.value)) {
      return this._required === true ? errorFactory.wrapWithError(result, "Required") : result;
    }

    if (!isNumber(result.value)) {
      return errorFactory.wrapWithError(result, "InvalidType", {
        expectedType: "number",
      });
    }
    if (
      this._precision !== null &&
      (`${result.value}`.split(".")[1] || "").length > this._precision
    ) {
      return errorFactory.wrapWithError(result, "Precision", {
        precision: this._precision,
      });
    }
    if (this._multipleOf !== null && result.value % this._multipleOf !== 0) {
      return errorFactory.wrapWithError(result, "MultipleOf", {
        multipleOf: this._multipleOf,
      });
    }
    if (this._min !== null && result.value < this._min) {
      return errorFactory.wrapWithError(result, "Min", {
        min: this._min,
      });
    }
    if (this._max !== null && result.value > this._max) {
      return errorFactory.wrapWithError(result, "Max", {
        max: this._max,
      });
    }
    if (this._minExclusive !== null && result.value <= this._minExclusive) {
      return errorFactory.wrapWithError(result, "MinExclusive", {
        minExclusive: this._minExclusive,
      });
    }
    if (this._maxExclusive !== null && result.value >= this._maxExclusive) {
      return errorFactory.wrapWithError(result, "MaxExclusive", {
        maxExclusive: this._maxExclusive,
      });
    }

    return result;
  }
}

function isEmpty(value: unknown): boolean {
  return isUndefined(value) || isNull(value);
}
