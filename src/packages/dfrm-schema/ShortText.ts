import type { RenderOptions, Schema } from "./Schema";
import { type RenderTextResult, type TextOptions, TextSchema } from "./Text";

export type ShortTextOptions<Meta> = TextOptions<Meta>;

export interface RenderShortTextResult<Meta> extends RenderTextResult<Meta> {
  type: "ShortText";
}

export class ShortTextSchema<Meta>
  extends TextSchema<Meta>
  implements Schema<Meta, RenderShortTextResult<Meta>>
{
  async render(options: RenderOptions<Meta>): Promise<RenderShortTextResult<Meta>> {
    return { type: "ShortText", ...(await this._render(options)) };
  }
}
