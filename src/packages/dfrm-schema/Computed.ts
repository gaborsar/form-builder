import { type ExpressionOptions, ExpressionSchema } from "./Expression";
import { type LocalizedMessageMap, localizeMessage } from "./IntlUtils";
import type { RenderOptions, RenderResult, Schema } from "./Schema";
import { orNull } from "./TypeUtils";

export interface ComputedOptions<Meta> extends ExpressionOptions {
  meta?: Meta;
  unit?: LocalizedMessageMap;
}

export interface RenderComputedResult<Meta> extends RenderResult<Meta> {
  type: "Computed";
  name: string;
  originalUnit?: LocalizedMessageMap;
  unit?: string;
}

export class ComputedSchema<Meta>
  extends ExpressionSchema
  implements Schema<Meta, RenderComputedResult<Meta>>
{
  private _meta: Meta | null;
  private _unit: LocalizedMessageMap | null;

  constructor({ meta, unit, ...options }: ComputedOptions<Meta>) {
    super(options);
    this._meta = orNull(meta);
    this._unit = orNull(unit);
  }

  async render(options: RenderOptions<Meta>): Promise<RenderComputedResult<Meta>> {
    const { locale, namePrefix } = options;

    const unsafeValue = await this.evaluate(options);
    let value: number | undefined;

    if (
      typeof unsafeValue === "number" &&
      !Number.isNaN(unsafeValue) &&
      unsafeValue !== Number.NEGATIVE_INFINITY &&
      unsafeValue !== Number.POSITIVE_INFINITY
    ) {
      value = unsafeValue;
    }

    const result: RenderComputedResult<Meta> = {
      type: "Computed",
      name: namePrefix,
      value,
      isValid: true,
    };
    if (this._meta !== null) {
      result.meta = this._meta;
    }
    if (this._unit !== null) {
      result.originalUnit = this._unit;
      result.unit = localizeMessage(this._unit, locale);
    }

    return result;
  }
}
