import { PhoneNumberUtil } from "google-libphonenumber";
import { type ErrorMessageMap, type MessageMap, localizeMessage } from "./IntlUtils";
import type { RenderOptions, RenderResult, Schema } from "./Schema";
import { isNull, isString, isUndefined, orNull } from "./TypeUtils";
import { ValidationErrorFactory } from "./ValidationUtils";

const phoneNumberUtil = PhoneNumberUtil.getInstance();

export interface PhoneNumberOptions<Meta> extends PhoneNumberValidationOptions {
  meta?: Meta;
  messages?: MessageMap;
  errorMessages?: ErrorMessageMap;
}

export interface RenderPhoneNumberResult<Meta>
  extends RenderResult<Meta>,
    PhoneNumberValidationOptions {
  type: "PhoneNumber";
  searchMessage: string;
  noOptionsMessage: string;
  name: string;
}

interface PhoneNumberValidationOptions {
  required?: boolean;
  defaultValue?: string;
}

export class PhoneNumberSchema<Meta> implements Schema<Meta, RenderPhoneNumberResult<Meta>> {
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
  }: PhoneNumberOptions<Meta>) {
    this._meta = orNull(meta);
    this._required = orNull(required);
    this._defaultValue = orNull(defaultValue);
    this._messages = messages;
    this._errorMessages = errorMessages;
  }

  async render(options: RenderOptions<Meta>): Promise<RenderPhoneNumberResult<Meta>> {
    const { fixValue = true, locale, namePrefix, value: unsafeValue } = options;

    const errorFactory = new ValidationErrorFactory(locale, {
      ...options.errorMessages,
      ...this._errorMessages,
    });

    const messages = {
      ...options.messages,
      ...this._messages,
    };

    const result: RenderPhoneNumberResult<Meta> = {
      type: "PhoneNumber",
      searchMessage: "",
      noOptionsMessage: "",
      name: namePrefix,
      value: unsafeValue,
      isValid: true,
    };
    if (this._meta !== null) {
      result.meta = this._meta;
    }
    if (messages.search !== undefined) {
      result.searchMessage = localizeMessage(messages.search, options.locale);
    }
    if (messages.noOptions !== undefined) {
      result.noOptionsMessage = localizeMessage(messages.noOptions, options.locale);
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
    if (!isPhoneNumberString(result.value)) {
      return errorFactory.wrapWithError(result, "InvalidFormat", {
        expectedFormat: "phone-number",
      });
    }

    return result;
  }
}

function isEmpty(value: unknown): boolean {
  return isUndefined(value) || isNull(value) || value === "";
}

function isPhoneNumberString(value: string): boolean {
  let out = false;
  try {
    out = phoneNumberUtil.isValidNumber(phoneNumberUtil.parse(value));
  } catch (e) {}
  return out;
}
