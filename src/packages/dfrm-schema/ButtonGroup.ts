import type { RenderOptions, Schema } from "./Schema";
import {
  type RenderSingleChoiceResult,
  type SingleChoiceOptions,
  SingleChoiceSchema,
} from "./SingleChoice";

export type ButtonGroupOptions<Meta> = SingleChoiceOptions<Meta>;

export interface RenderButtonGroupResult<Meta> extends RenderSingleChoiceResult<Meta> {
  type: "ButtonGroup";
}

export class ButtonGroupSchema<Meta>
  extends SingleChoiceSchema<Meta>
  implements Schema<Meta, RenderButtonGroupResult<Meta>>
{
  async render(options: RenderOptions<Meta>): Promise<RenderButtonGroupResult<Meta>> {
    return { ...(await this._render(options)), type: "ButtonGroup" };
  }
}
