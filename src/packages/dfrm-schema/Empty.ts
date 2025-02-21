import type { RenderResult } from "./Schema";
import { isObject } from "./TypeUtils";

export interface EmptyResult<Meta> extends RenderResult<Meta> {
  type: "Empty";
  value: unknown;
}

export function isEmptyResult<Meta>(result: RenderResult<Meta>): result is EmptyResult<Meta> {
  return isObject(result) && result.type === "Empty";
}
