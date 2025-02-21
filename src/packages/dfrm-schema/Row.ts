import type { RenderColumnResult } from "./Column";
import type { ConditionalSchema } from "./Conditional";
import { type EmptyResult, isEmptyResult } from "./Empty";
import type { RenderOptions, RenderResult, Schema } from "./Schema";
import { isObject } from "./TypeUtils";
import { fixColumnWidths } from "./fixColumnWidths";

export interface RowOptions<Meta> {
  children: RowChildSchema<Meta>[];
}

export interface RenderRowResult<Meta> extends RenderResult<Meta> {
  type: "Row";
  children?: RenderColumnResult<Meta>[];
}

export type RowChildSchema<Meta> =
  | ConditionalSchema<Meta, RenderColumnResult<Meta> | EmptyResult<Meta>>
  | Schema<Meta, RenderColumnResult<Meta> | EmptyResult<Meta>>;

export class RowSchema<Meta> implements Schema<Meta, RenderRowResult<Meta> | EmptyResult<Meta>> {
  private _children: RowChildSchema<Meta>[];

  constructor({ children }: RowOptions<Meta>) {
    this._children = children;
  }

  async render(options: RenderOptions<Meta>): Promise<RenderRowResult<Meta> | EmptyResult<Meta>> {
    let { value } = options;
    if (!isObject(value)) {
      throw new Error();
    }

    const children: RenderColumnResult<Meta>[] = [];
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

    fixColumnWidths(children);

    return {
      type: "Row",
      value,
      isValid: children.every((child) => child.isValid),
      children,
    };
  }
}
