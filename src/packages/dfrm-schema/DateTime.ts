import { type ErrorMessageMap, type MessageMap, localizeMessage } from "./IntlUtils";
import type { RenderOptions, RenderResult, Schema } from "./Schema";
import { isNull, isString, isUndefined, orNull } from "./TypeUtils";
import { ValidationErrorFactory } from "./ValidationUtils";

const PATTERN_DATE_TIME = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2})?$/;
const PATTERN_ISO_DATE_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3,6}Z?$/;

export interface DateTimeOptions<Meta> extends DateTimeValidationOptions {
  meta?: Meta;
  messages?: MessageMap;
  errorMessages?: ErrorMessageMap;
}

export interface RenderDateTimeResult<Meta> extends RenderResult<Meta>, DateTimeValidationOptions {
  type: "DateTime";
  nowMessage: string;
  name: string;
}

interface DateTimeValidationOptions {
  required?: boolean;
  defaultValue?: string;
}

export class DateTimeSchema<Meta> implements Schema<Meta, RenderDateTimeResult<Meta>> {
  private _meta: Meta | null;
  private _required: boolean | null;
  private _defaultValue: string | null;
  private _messages: MessageMap;
  private _errorMessages: ErrorMessageMap;

  constructor({
    meta,
    required,
    defaultValue,
    messages = {},
    errorMessages = {},
  }: DateTimeOptions<Meta>) {
    this._meta = orNull(meta);
    this._required = orNull(required);
    this._defaultValue = orNull(defaultValue);
    this._messages = messages;
    this._errorMessages = errorMessages;
  }

  async render(options: RenderOptions<Meta>): Promise<RenderDateTimeResult<Meta>> {
    const { fixValue = true, locale, namePrefix, value: unsafeValue } = options;

    const errorFactory = new ValidationErrorFactory(locale, {
      ...options.errorMessages,
      ...this._errorMessages,
    });

    const messages = {
      ...options.messages,
      ...this._messages,
    };

    const result: RenderDateTimeResult<Meta> = {
      type: "DateTime",
      nowMessage: "",
      name: namePrefix,
      value: unsafeValue,
      isValid: true,
    };
    if (this._meta !== null) {
      result.meta = this._meta;
    }
    if (messages.now !== undefined) {
      result.nowMessage = localizeMessage(messages.now, locale);
    }
    if (this._required !== null) {
      result.required = this._required;
    }
    if (this._defaultValue !== null) {
      result.defaultValue = this._defaultValue;
    }

    if (fixValue && !isNull(result.value)) {
      if (isUndefined(result.value) || !isString(result.value) || !isDateTimeString(result.value)) {
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
    if (!isDateTimeString(result.value)) {
      return errorFactory.wrapWithError(result, "InvalidFormat", {
        expectedFormat: "date-time",
      });
    }

    return result;
  }
}

function isEmpty(value: unknown): boolean {
  return isUndefined(value) || isNull(value) || value === "";
}

function isDateTimeString(value: string): boolean {
  return PATTERN_DATE_TIME.test(value) || PATTERN_ISO_DATE_TIME.test(value);
}
