import type { SchemaTreeNodeData } from "../../../model";

export function createMultiSelectData(data: SchemaTreeNodeData): SchemaTreeNodeData {
  const out: SchemaTreeNodeData = {
    type: "MultiSelect",
    required: true,
    defaultValue: [],
  };
  if ("required" in data) {
    out.required = data.required;
  }
  if ("defaultValue" in data && Array.isArray(data.defaultValue)) {
    out.defaultValue = data.defaultValue;
  }
  return out;
}
