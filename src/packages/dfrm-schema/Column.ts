import type { ConditionalSchema } from "./Conditional";
import { type EmptyResult, isEmptyResult } from "./Empty";
import type { RenderFieldResult } from "./Field";
import type { RenderFieldGroupListResult } from "./FieldGroupList";
import type { RenderFieldListResult } from "./FieldList";
import type { RenderObjectResult } from "./Object";
import type { RenderOptions, RenderResult, Schema } from "./Schema";
import { isObject } from "./TypeUtils";

export interface ColumnOptions<Meta> {
  width: number;
  grow?: boolean;
  child: ColumnChildSchema<Meta>;
}

export interface RenderColumnResult<Meta> extends RenderResult<Meta> {
  type: "Column";
  width: number;
  grow: boolean;
  child?: RenderColumnChildResult<Meta>;
}

export type ColumnChildSchema<Meta> =
  | ConditionalSchema<Meta, RenderColumnChildResult<Meta> | EmptyResult<Meta>>
  | Schema<Meta, RenderColumnChildResult<Meta> | EmptyResult<Meta>>;

export type RenderColumnChildResult<Meta> =
  | RenderObjectResult<Meta>
  | RenderFieldGroupListResult<Meta>
  | RenderFieldListResult<Meta>
  | RenderFieldResult<Meta>;

export class ColumnSchema<Meta>
  implements Schema<Meta, RenderColumnResult<Meta> | EmptyResult<Meta>>
{
  private _width: number;
  private _grow: boolean;
  private _child: ColumnChildSchema<Meta>;

  constructor({ grow = false, width, child }: ColumnOptions<Meta>) {
    this._width = width;
    this._grow = grow;
    this._child = child;
  }

  async render(
    options: RenderOptions<Meta>,
  ): Promise<RenderColumnResult<Meta> | EmptyResult<Meta>> {
    let { value } = options;
    if (!isObject(value)) {
      throw new Error();
    }

    const childResult = await this._child.render(options);
    if (isObject(childResult.value)) {
      value = childResult.value;
    }

    if (isEmptyResult(childResult)) {
      return { type: "Empty", value, isValid: true };
    }

    return {
      type: "Column",
      width: this._width,
      grow: this._grow,
      value,
      isValid: childResult.isValid,
      child: childResult,
    };
  }
}
