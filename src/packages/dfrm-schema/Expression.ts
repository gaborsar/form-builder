import { safeEval } from "./EvalUtils";
import { type Path, findValueByPath, resolvePath } from "./PathUtils";
import { isString } from "./TypeUtils";

const PATTERN_OPERAND = /\{[\w\d./_]+\}/g;

export interface ExpressionOptions {
  template: string;
}

export interface EvaluateExpressionOptions {
  root: unknown;
  path: Path;
}

export class ExpressionSchema {
  protected _template: string;
  protected _refs: { exp: RegExp; path: Path }[];

  constructor({ template }: ExpressionOptions) {
    this._template = template;
    const matches = template.match(PATTERN_OPERAND);
    if (matches === null) {
      this._refs = [];
    } else {
      this._refs = Array.from(new Set(matches).values()).map((str) => ({
        exp: new RegExp(str, "g"),
        path: str.slice(1, -1).split("/"),
      }));
    }
  }

  async evaluate(options: EvaluateExpressionOptions): Promise<unknown> {
    let template = this._template;
    for (const ref of this._refs) {
      const resolvedPath = resolvePath(options.path.slice(0, -1), ref.path);
      const value: unknown = findValueByPath(options.root, resolvedPath);
      if (value === undefined) {
        return undefined;
      }
      if (isString(value)) {
        template = template.replace(ref.exp, `"${value}"`);
      } else {
        template = template.replace(ref.exp, JSON.stringify(value));
      }
    }
    try {
      return safeEval(template);
    } catch (e) {
      return undefined;
    }
  }
}
