import type { SchemaTreeNodeData } from "../../../model";

export function createNumberData(data: SchemaTreeNodeData): SchemaTreeNodeData {
  const out: SchemaTreeNodeData = {
    type: "Number",
    required: true,
    defaultValue: null,
    precision: null,
    multipleOf: null,
    min: null,
    max: null,
    minExclusive: null,
    maxExclusive: null,
    unit: {},
  };
  if ("required" in data) {
    out.required = data.required;
  }
  if ("defaultValue" in data && typeof data.defaultValue === "number") {
    out.defaultValue = data.defaultValue;
  }
  if ("precision" in data) {
    out.precision = data.precision;
  }
  if ("multipleOf" in data) {
    out.multipleOf = data.multipleOf;
  }
  if ("min" in data) {
    out.min = data.min;
  }
  if ("max" in data) {
    out.max = data.max;
  }
  if ("minExclusive" in data) {
    out.minExclusive = data.minExclusive;
  }
  if ("maxExclusive" in data) {
    out.maxExclusive = data.maxExclusive;
  }
  if ("unit" in data) {
    out.unit = data.unit;
  }
  return out;
}
