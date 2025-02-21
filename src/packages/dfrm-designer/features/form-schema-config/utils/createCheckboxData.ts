import type { SchemaTreeNodeData } from "../../../model";

export function createCheckboxData(data: SchemaTreeNodeData): SchemaTreeNodeData {
  const out: SchemaTreeNodeData = {
    type: "Checkbox",
    defaultValue: false,
  };
  if ("defaultValue" in data && typeof data.defaultValue === "boolean") {
    out.defaultValue = data.defaultValue;
  }
  return out;
}
