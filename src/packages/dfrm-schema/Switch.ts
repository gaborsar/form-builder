import { type BooleanOptions, BooleanSchema, type RenderBooleanResult } from "./Boolean";
import type { RenderOptions, Schema } from "./Schema";

export type SwitchOptions<Meta> = BooleanOptions<Meta>;

export interface RenderSwitchResult<Meta> extends RenderBooleanResult<Meta> {
  type: "Switch";
}

export class SwitchSchema<Meta>
  extends BooleanSchema<Meta>
  implements Schema<Meta, RenderSwitchResult<Meta>>
{
  async render(options: RenderOptions<Meta>): Promise<RenderSwitchResult<Meta>> {
    return { type: "Switch", ...(await this._render(options)) };
  }
}
