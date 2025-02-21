import type { ComponentSchemaTreeNodeData } from "../../../model";

export function createLongTextData(data: ComponentSchemaTreeNodeData): ComponentSchemaTreeNodeData {
  const out: ComponentSchemaTreeNodeData = {
    type: "LongText",
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
