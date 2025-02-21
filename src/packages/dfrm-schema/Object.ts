import { assoc, dissoc } from "ramda";
import type { ConditionalSchema } from "./Conditional";
import { type EmptyResult, isEmptyResult } from "./Empty";
import type { ErrorMessageMap } from "./IntlUtils";
import type { RenderRowResult } from "./Row";
import type { RenderOptions, RenderResult, Schema } from "./Schema";
import { isObject, orNull } from "./TypeUtils";
import { ValidationErrorFactory } from "./ValidationUtils";

export interface ObjectOptions<Meta> {
  meta?: Meta;
  key: string;
  errorMessages?: ErrorMessageMap;
  children: ObjectChildSchema<Meta>[];
}

export interface RenderObjectResult<Meta> extends RenderResult<Meta> {
  type: "Object";
  key: string;
  children?: RenderRowResult<Meta>[];
}

export type ObjectChildSchema<Meta> =
  | ConditionalSchema<Meta, RenderRowResult<Meta> | EmptyResult<Meta>>
  | Schema<Meta, RenderRowResult<Meta> | EmptyResult<Meta>>;

export class ObjectSchema<Meta>
  implements Schema<Meta, RenderObjectResult<Meta> | EmptyResult<Meta>>
{
  private _meta: Meta | null;
  private _key: string;
  private _errorMessages: ErrorMessageMap;
  private _children: ObjectChildSchema<Meta>[];

  constructor({ meta, key, errorMessages = {}, children }: ObjectOptions<Meta>) {
    this._meta = orNull(meta);
    this._key = key;
    this._errorMessages = errorMessages;
    this._children = children;
  }

  async render(
    options: RenderOptions<Meta>,
  ): Promise<RenderObjectResult<Meta> | EmptyResult<Meta>> {
    const key = this._key;
    const { fixValue = true, path, namePrefix, locale, value: unsafeValue } = options;

    if (!isObject(unsafeValue)) {
      throw new Error();
    }

    let value = unsafeValue;

    const errorFactory = new ValidationErrorFactory(locale, {
      ...options.errorMessages,
      ...this._errorMessages,
    });

    let result: RenderObjectResult<Meta> = {
      type: "Object",
      key,
      value: unsafeValue,
      isValid: true,
    };
    if (this._meta !== null) {
      result.meta = this._meta;
    }

    const unsafeProperty = value[key];
    let property: { [key: string]: unknown };

    if (fixValue) {
      if (isObject(unsafeProperty)) {
        property = unsafeProperty;
      } else {
        property = {};
      }
    } else {
      if (!isObject(unsafeProperty)) {
        return errorFactory.wrapWithError(result, "InvalidType", {
          expectedType: "object",
        });
      }
      property = unsafeProperty;
    }

    if (value[key] !== property) {
      if (property === undefined) {
        value = dissoc(key, value);
      } else {
        value = assoc(key, property, value);
      }
      result = { ...result, value };
    }

    const children: RenderRowResult<Meta>[] = [];
    const childPath = path.concat(key);
    const childNamePrefix = namePrefix === "" ? key : `${namePrefix}-${key}`;
    for (const child of this._children) {
      const childResult = await child.render({
        ...options,
        path: childPath,
        namePrefix: childNamePrefix,
        value: property,
      });
      if (isObject(childResult.value)) {
        property = childResult.value;
      }
      if (!isEmptyResult(childResult)) {
        children.push(childResult as RenderRowResult<Meta>);
      }
    }

    if (value[key] !== property) {
      if (property === undefined) {
        value = dissoc(key, value);
      } else {
        value = assoc(key, property, value);
      }
      result = { ...result, value };
    }

    const knownKeys = new Set<string>();
    for (const { children: columns = [] } of children) {
      for (const { child } of columns) {
        if (child !== undefined) {
          knownKeys.add(child.key);
        }
      }
    }

    if (fixValue) {
      for (const key of Object.keys(property)) {
        if (!knownKeys.has(key)) {
          property = dissoc(key, property);
        }
      }
    } else {
      for (const key of Object.keys(property)) {
        if (!knownKeys.has(key)) {
          return errorFactory.wrapWithError(result, "UnknownKey", {
            key,
          });
        }
      }
    }

    if (value[key] !== property) {
      if (property === undefined) {
        value = dissoc(key, value);
      } else {
        value = assoc(key, property, value);
      }
      result = { ...result, value };
    }

    if (children.length === 0) {
      return { type: "Empty", value, isValid: true };
    }

    return {
      ...result,
      value,
      isValid: result.isValid && children.every((child) => child.isValid),
      children,
    };
  }
}
