import type { RenderOptions, Schema } from "./Schema";
import { type RenderTextResult, type TextOptions, TextSchema } from "./Text";

export type LongTextOptions<Meta> = TextOptions<Meta>;

export interface RenderLongTextResult<Meta> extends RenderTextResult<Meta> {
  type: "LongText";
}

export class LongTextSchema<Meta>
  extends TextSchema<Meta>
  implements Schema<Meta, RenderLongTextResult<Meta>>
{
  async render(options: RenderOptions<Meta>): Promise<RenderLongTextResult<Meta>> {
    return { type: "LongText", ...(await this._render(options)) };
  }
}
