import type { RenderOptions, Schema } from "./Schema";
import {
  type RenderSingleChoiceResult,
  type SingleChoiceOptions,
  SingleChoiceSchema,
} from "./SingleChoice";
import { orNull } from "./TypeUtils";

export type RadioGroupOptions<Meta> = SingleChoiceOptions<Meta> & RadioGroupLayoutOptions;

export interface RenderRadioGroupResult<Meta>
  extends RenderSingleChoiceResult<Meta>,
    RadioGroupLayoutOptions {
  type: "RadioGroup";
}

export interface RadioGroupLayoutOptions {
  direction?: RadioGroupDirection;
  columns?: number; // vertical only
}

export type RadioGroupDirection = "vertical" | "horizontal";

export class RadioGroupSchema<Meta>
  extends SingleChoiceSchema<Meta>
  implements Schema<Meta, RenderRadioGroupResult<Meta>>
{
  private _direction: RadioGroupDirection | null;
  private _columns: number | null;

  constructor({ direction, columns, ...options }: RadioGroupOptions<Meta>) {
    super(options);
    this._direction = orNull(direction);
    this._columns = orNull(columns);
  }

  async render(options: RenderOptions<Meta>): Promise<RenderRadioGroupResult<Meta>> {
    const result: RenderRadioGroupResult<Meta> = {
      ...(await this._render(options)),
      type: "RadioGroup",
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
