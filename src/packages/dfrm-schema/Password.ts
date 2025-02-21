import type { RenderOptions, Schema } from "./Schema";
import { type RenderTextResult, type TextOptions, TextSchema } from "./Text";

export type PasswordOptions<Meta> = TextOptions<Meta>;

export interface RenderPasswordResult<Meta> extends RenderTextResult<Meta> {
  type: "Password";
}

export class PasswordSchema<Meta>
  extends TextSchema<Meta>
  implements Schema<Meta, RenderPasswordResult<Meta>>
{
  async render(options: RenderOptions<Meta>): Promise<RenderPasswordResult<Meta>> {
    return { type: "Password", ...(await this._render(options)) };
  }
}
