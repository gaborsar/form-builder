import {
  type MultiChoiceOptions,
  MultiChoiceSchema,
  type RenderMultiChoiceResult,
} from "./MultiChoice";
import type { RenderOptions, Schema } from "./Schema";
import { orNull } from "./TypeUtils";

export type CheckboxGroupOptions<Meta> = MultiChoiceOptions<Meta> & CheckboxGroupLayoutOptions;

export interface RenderCheckboxGroupResult<Meta>
  extends RenderMultiChoiceResult<Meta>,
    CheckboxGroupLayoutOptions {
  type: "CheckboxGroup";
}

export interface CheckboxGroupLayoutOptions {
  direction?: CheckboxGroupDirection;
  columns?: number; // vertical only
}

export type CheckboxGroupDirection = "vertical" | "horizontal";

export class CheckboxGroupSchema<Meta>
  extends MultiChoiceSchema<Meta>
  implements Schema<Meta, RenderCheckboxGroupResult<Meta>>
{
  private _direction: CheckboxGroupDirection | null;
  private _columns: number | null;

  constructor({ direction, columns, ...options }: CheckboxGroupOptions<Meta>) {
    super(options);
    this._direction = orNull(direction);
    this._columns = orNull(columns);
  }

  async render(options: RenderOptions<Meta>): Promise<RenderCheckboxGroupResult<Meta>> {
    const result: RenderCheckboxGroupResult<Meta> = {
      ...(await this._render(options)),
      type: "CheckboxGroup",
    };
    if (this._direction !== null) {
      result.direction = this._direction;
    }
    if (this._columns !== null) {
      result.columns = this._columns;
    }
    return result;
  }
}
