import type { SchemaTreeNodeData } from "../../../model";

export function createShortTextData(data: SchemaTreeNodeData): SchemaTreeNodeData {
  const out: SchemaTreeNodeData = {
    type: "ShortText",
    required: true,
    defaultValue: "",
    minLength: null,
    maxLength: null,
    pattern: "",
  };
  if ("required" in data) {
    out.required = data.required;
  }
  if ("defaultValue" in data && typeof data.defaultValue === "string") {
    out.defaultValue = data.defaultValue;
  }
  if ("minLength" in data) {
    out.minLength = data.minLength;
  }
  if ("maxLength" in data) {
    out.maxLength = data.maxLength;
  }
  if ("pattern" in data) {
    out.pattern = data.pattern;
  }
  return out;
}
