import type { ConditionalSchema } from "./Conditional";
import { type EmptyResult, isEmptyResult } from "./Empty";
import { type LocalizedMessageMap, localizeMessage } from "./IntlUtils";
import type { RenderRowResult } from "./Row";
import type { RenderOptions, RenderResult, Schema } from "./Schema";
import { isObject } from "./TypeUtils";

export interface FieldsetOptions<Meta> {
  label: LocalizedMessageMap;
  children: FieldsetChildSchema<Meta>[];
}

export interface RenderFieldsetResult<Meta> extends RenderResult<Meta> {
  type: "Fieldset";
  label: string;
  children?: RenderRowResult<Meta>[];
}

export type FieldsetChildSchema<Meta> =
  | ConditionalSchema<Meta, RenderRowResult<Meta> | EmptyResult<Meta>>
  | Schema<Meta, RenderRowResult<Meta> | EmptyResult<Meta>>;

export class FieldsetSchema<Meta>
  implements Schema<Meta, RenderFieldsetResult<Meta> | EmptyResult<Meta>>
{
  private _label: LocalizedMessageMap;
  private _children: FieldsetChildSchema<Meta>[];

  constructor({ label, children }: FieldsetOptions<Meta>) {
    this._label = label;
    this._children = children;
  }

  async render(
    options: RenderOptions<Meta>,
  ): Promise<RenderFieldsetResult<Meta> | EmptyResult<Meta>> {
    const { locale } = options;

    let { value } = options;
    if (!isObject(value)) {
      throw new Error();
    }

    const children: RenderRowResult<Meta>[] = [];
    for (const child of this._children) {
      const childResult = await child.render({ ...options, value });
      if (isObject(childResult.value)) {
        value = childResult.value;
      }
      if (!isEmptyResult(childResult)) {
        children.push(childResult);
      }
    }

    if (children.length === 0) {
      return { type: "Empty", value, isValid: true };
    }

    return {
      type: "Fieldset",
      label: localizeMessage(this._label, locale),
      value,
      isValid: children.every((child) => child.isValid),
      errors: [],
      children,
    };
  }
}
