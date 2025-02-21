import type { LogDetails } from "dfrm-schema";
import type { Meta } from "../../../model";

export function mapMetaToLogDetails(meta: Meta): LogDetails {
  const out: LogDetails = {};
  if (meta.ids !== undefined) {
    out.interpretations = meta.ids;
  }
  if (meta.tags !== undefined) {
    out.tags = meta.tags;
  }
  return out;
}
