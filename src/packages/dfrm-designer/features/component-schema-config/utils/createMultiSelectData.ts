import type { ComponentSchemaTreeNodeData } from "../../../model";

export function createMultiSelectData(
  data: ComponentSchemaTreeNodeData,
): ComponentSchemaTreeNodeData {
  const out: ComponentSchemaTreeNodeData = {
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
