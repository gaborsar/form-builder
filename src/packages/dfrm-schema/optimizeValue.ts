import { assoc, dissoc } from "ramda";

export function optimizeValue(value: unknown): unknown {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }
  if (typeof value === "object") {
    if (Array.isArray(value)) {
      const out = value.map(optimizeValue);
      if (out.length === 0) {
        return undefined;
      }
      return out;
    }
    let out = value as { [key: string]: unknown };
    for (const [k, v1] of Object.entries(out)) {
      const v2 = optimizeValue(v1);
      if (v2 === undefined) {
        out = dissoc(k, out);
      } else {
        out = assoc(k, v2, out);
      }
    }
    if (Object.keys(out).length === 0) {
      return undefined;
    }
    return out;
  }
  return value;
}
