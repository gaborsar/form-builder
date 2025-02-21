import {
  type MultiChoiceOptions,
  MultiChoiceSchema,
  type RenderMultiChoiceResult,
} from "./MultiChoice";
import type { RenderOptions, Schema } from "./Schema";
import { orNull } from "./TypeUtils";

export type SwitchGroupOptions<Meta> = MultiChoiceOptions<Meta> & SwitchGroupLayoutOptions;

export interface RenderSwitchGroupResult<Meta>
  extends RenderMultiChoiceResult<Meta>,
    SwitchGroupLayoutOptions {
  type: "SwitchGroup";
}

export interface SwitchGroupLayoutOptions {
  direction?: SwitchGroupDirection;
  columns?: number; // vertical only
}

export type SwitchGroupDirection = "vertical" | "horizontal";

export class SwitchGroupSchema<Meta>
  extends MultiChoiceSchema<Meta>
  implements Schema<Meta, RenderSwitchGroupResult<Meta>>
{
  private _direction: SwitchGroupDirection | null;
  private _columns: number | null;

  constructor({ direction, columns, ...options }: SwitchGroupOptions<Meta>) {
    super(options);
    this._direction = orNull(direction);
    this._columns = orNull(columns);
  }

  async render(options: RenderOptions<Meta>): Promise<RenderSwitchGroupResult<Meta>> {
    const result: RenderSwitchGroupResult<Meta> = {
      ...(await this._render(options)),
      type: "SwitchGroup",
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
