import { assoc, dissoc } from "ramda";
import type { ConditionalSchema } from "./Conditional";
import { type EmptyResult, isEmptyResult } from "./Empty";
import type { RenderInputResult } from "./Input";
import { type LocalizedMessageMap, localizeMessage } from "./IntlUtils";
import type { RenderOptions, RenderResult, Schema } from "./Schema";
import { isObject, orNull } from "./TypeUtils";

export interface FieldOptions<Meta> {
  meta?: Meta;
  key: string;
  label: LocalizedMessageMap;
  child: FieldChildSchema<Meta>;
}

export interface RenderFieldResult<Meta> extends RenderResult<Meta> {
  type: "Field";
  key: string;
  label: string;
  child?: RenderInputResult<Meta>;
}

export type FieldChildSchema<Meta> =
  | ConditionalSchema<Meta, RenderInputResult<Meta> | EmptyResult<Meta>>
  | Schema<Meta, RenderInputResult<Meta> | EmptyResult<Meta>>;

export class FieldSchema<Meta>
  implements Schema<Meta, RenderFieldResult<Meta> | EmptyResult<Meta>>
{
  private _meta: Meta | null;
  private _key: string;
  private _label: LocalizedMessageMap;
  private _child: FieldChildSchema<Meta>;

  constructor({ meta, key, label, child }: FieldOptions<Meta>) {
    this._meta = orNull(meta);
    this._key = key;
    this._label = label;
    this._child = child;
  }

  async render(options: RenderOptions<Meta>): Promise<RenderFieldResult<Meta> | EmptyResult<Meta>> {
    const key = this._key;
    const { locale, path, namePrefix } = options;

    let { value } = options;
    if (!isObject(value)) {
      throw new Error();
    }

    const childResult = await this._child.render({
      ...options,
      path: path.concat(key),
      namePrefix: namePrefix === "" ? key : `${namePrefix}-${key}`,
      value: value[key],
    });

    if (value[key] !== childResult.value) {
      if (childResult.value === undefined) {
        value = dissoc(key, value);
      } else {
        value = assoc(key, childResult.value, value);
      }
    }

    if (isEmptyResult(childResult)) {
      return { type: "Empty", value, isValid: true };
    }

    const result: RenderFieldResult<Meta> = {
      type: "Field",
      key,
      label: localizeMessage(this._label, locale),
      value,
      isValid: childResult.isValid,
      child: childResult,
    };
    if (this._meta !== null) {
      result.meta = this._meta;
    }

    return result;
  }
}
