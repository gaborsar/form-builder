import { type ErrorMessageMap, type MessageMap, localizeMessage } from "./IntlUtils";
import type { Option, RenderOptionResult } from "./Option";
import type { RenderOptions, RenderResult, Schema } from "./Schema";
import { isNull, isString, isUndefined, orNull } from "./TypeUtils";
import { ValidationErrorFactory } from "./ValidationUtils";

export interface RemoteDropdownOptions<Meta> extends RemoteDropdownValidationOptions {
  meta?: Meta;
  path: string;
  messages?: MessageMap;
  errorMessages?: ErrorMessageMap;
}

export interface RenderRemoteDropdownResult<Meta>
  extends RenderResult<Meta>,
    RemoteDropdownValidationOptions {
  type: "RemoteDropdown";
  selectMessage: string;
  searchMessage: string;
  noOptionsMessage: string;
  name: string;
  options: RenderOptionResult<Meta>[];
}

interface RemoteDropdownValidationOptions {
  required?: boolean;
}

export class RemoteDropdownSchema<Meta> implements Schema<Meta, RenderRemoteDropdownResult<Meta>> {
  private _meta: Meta | null;
  private _path: string;
  private _required: boolean | null;
  private _options: Option<Meta>[] = [];
  private _messages: MessageMap;
  private _errorMessages: ErrorMessageMap;

  constructor({
    meta,
    path,
    required,
    messages = {},
    errorMessages = {},
  }: RemoteDropdownOptions<Meta>) {
    this._meta = orNull(meta);
    this._path = path;
    this._required = orNull(required);
    this._messages = messages;
    this._errorMessages = errorMessages;
  }

  async render(options: RenderOptions<Meta>): Promise<RenderRemoteDropdownResult<Meta>> {
    const { fixValue = true, locale, namePrefix, value: unsafeValue, fetchRemoteOptions } = options;

    if (this._options.length === 0 && fetchRemoteOptions !== undefined) {
      this._options = await fetchRemoteOptions(this._path);
    }

    const errorFactory = new ValidationErrorFactory(locale, {
      ...options.errorMessages,
      ...this._errorMessages,
    });

    const messages = {
      ...options.messages,
      ...this._messages,
    };

    const renderedOptions = this._options.map(({ label, ...rest }) => ({
      ...rest,
      label: localizeMessage(label, locale),
    }));

    const allowedValues: unknown[] = this._options.map(({ value }) => value);

    const result: RenderRemoteDropdownResult<Meta> = {
      type: "RemoteDropdown",
      selectMessage: "",
      searchMessage: "",
      noOptionsMessage: "",
      name: namePrefix,
      options: renderedOptions,
      value: unsafeValue,
      isValid: true,
    };
    if (this._meta !== null) {
      result.meta = this._meta;
    }
    if (messages.select !== undefined) {
      result.selectMessage = localizeMessage(messages.select, options.locale);
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

    if (fixValue && !isNull(result.value)) {
      if (isUndefined(result.value) || !allowedValues.includes(result.value)) {
        result.value = null;
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
