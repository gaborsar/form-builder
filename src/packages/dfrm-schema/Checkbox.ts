import { type BooleanOptions, BooleanSchema, type RenderBooleanResult } from "./Boolean";
import type { RenderOptions, Schema } from "./Schema";

export type CheckboxOptions<Meta> = BooleanOptions<Meta>;

export interface RenderCheckboxResult<Meta> extends RenderBooleanResult<Meta> {
  type: "Checkbox";
}

export class CheckboxSchema<Meta>
  extends BooleanSchema<Meta>
  implements Schema<Meta, RenderCheckboxResult<Meta>>
{
  async render(options: RenderOptions<Meta>): Promise<RenderCheckboxResult<Meta>> {
    return { type: "Checkbox", ...(await this._render(options)) };
  }
}
