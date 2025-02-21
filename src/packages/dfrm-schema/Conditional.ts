import type { EmptyResult } from "./Empty";
import { type ExpressionOptions, ExpressionSchema } from "./Expression";
import type { RenderOptions, RenderResult, Schema } from "./Schema";
import { orNull } from "./TypeUtils";

export interface ConditionalOptions<Meta, Result extends RenderResult<Meta>>
  extends ExpressionOptions {
  then: Schema<Meta, Result>;
  else?: Schema<Meta, Result>;
}

export class ConditionalSchema<Meta, Result extends RenderResult<Meta>>
  extends ExpressionSchema
  implements Schema<Meta, Result | EmptyResult<Meta>>
{
  private _then: Schema<Meta, Result>;
  private _else: Schema<Meta, Result> | null;

  constructor({ then: $then, else: $else, ...options }: ConditionalOptions<Meta, Result>) {
    super(options);
    this._then = $then;
    this._else = orNull($else);
  }

  async render(options: RenderOptions<Meta>): Promise<Result | EmptyResult<Meta>> {
    if ((await this.evaluate(options)) === true) {
      return await this._then.render(options);
    }
    if (this._else !== null) {
      return await this._else.render(options);
    }
    return { type: "Empty", value: null, isValid: true };
  }
}
