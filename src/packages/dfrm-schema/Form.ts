import { dissoc } from "ramda";
import type { ConditionalSchema } from "./Conditional";
import { type EmptyResult, isEmptyResult } from "./Empty";
import type { RenderFieldsetResult } from "./Fieldset";
import type { ErrorMessageMap, MessageMap } from "./IntlUtils";
import type { Option } from "./Option";
import type { RenderResult, Schema } from "./Schema";
import { isObject, orNull } from "./TypeUtils";
import { ValidationErrorFactory } from "./ValidationUtils";

export interface FormOptions<Meta> {
  meta?: Meta;
  messages?: MessageMap;
  errorMessages?: ErrorMessageMap;
  children: FormChildSchema<Meta>[];
}

export interface RenderFormOptions<Meta> {
  fixValue?: boolean;
  locale: string;
  value: unknown;
  messages?: MessageMap;
  errorMessages?: ErrorMessageMap;
  fetchRemoteOptions?(path: string): Promise<Option<Meta>[]>;
}

export interface RenderFormResult<Meta> extends RenderResult<Meta> {
  type: "Form";
  children?: RenderFieldsetResult<Meta>[];
}

export type FormChildSchema<Meta> =
  | ConditionalSchema<Meta, RenderFieldsetResult<Meta> | EmptyResult<Meta>>
  | Schema<Meta, RenderFieldsetResult<Meta> | EmptyResult<Meta>>;

export class FormSchema<Meta> {
  private _meta: Meta | null;
  private _messages: MessageMap;
  private _errorMessages: ErrorMessageMap;
  private _children: FormChildSchema<Meta>[];

  constructor({ meta, messages = {}, errorMessages = {}, children }: FormOptions<Meta>) {
    this._meta = orNull(meta);
    this._messages = messages;
    this._errorMessages = errorMessages;
    this._children = children;
  }

  async render(options: RenderFormOptions<Meta>): Promise<RenderFormResult<Meta>> {
    const { fixValue = true, locale, value: unsafeValue } = options;

    const errorFactory = new ValidationErrorFactory(locale, this._errorMessages);

    let result: RenderFormResult<Meta> = {
      type: "Form",
      value: unsafeValue,
      isValid: true,
    };
    if (this._meta !== null) {
      result.meta = this._meta;
    }

    let value: { [key: string]: unknown };
    if (fixValue) {
      if (isObject(unsafeValue)) {
        value = unsafeValue;
      } else {
        value = {};
      }
    } else {
      if (!isObject(unsafeValue)) {
        return errorFactory.wrapWithError(result, "InvalidType", {
          expectedType: "object",
        });
      }
      value = unsafeValue;
    }

    const children: RenderFieldsetResult<Meta>[] = [];

    for (const child of this._children) {
      const childResult = await child.render({
        ...options,
        value,
        root: value,
        path: [],
        namePrefix: "",
        messages: this._messages,
        errorMessages: this._errorMessages,
      });
      if (isObject(childResult.value)) {
        value = childResult.value;
      }
      if (!isEmptyResult(childResult)) {
        children.push(childResult);
      }
    }

    if (result.value !== value) {
      result = { ...result, value };
    }

    const knownKeys = new Set<string>();
    for (const { children: rows = [] } of children) {
      for (const { children: columns = [] } of rows) {
        for (const { child } of columns) {
          if (child !== undefined) {
            knownKeys.add(child.key);
          }
        }
      }
    }

    if (fixValue) {
      for (const key of Object.keys(value)) {
        if (!knownKeys.has(key)) {
          value = dissoc(key, value);
        }
      }
    } else {
      for (const key of Object.keys(value)) {
        if (!knownKeys.has(key)) {
          return errorFactory.wrapWithError(result, "UnknownKey", {
            key,
          });
        }
      }
    }

    return {
      ...result,
      value,
      isValid: result.isValid && children.every((child) => child.isValid),
      children,
    };
  }
}
