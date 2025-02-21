import type { ComponentSchemaTreeNodeData } from "../../../model";

export function createCheckboxData(data: ComponentSchemaTreeNodeData): ComponentSchemaTreeNodeData {
  const out: ComponentSchemaTreeNodeData = {
    type: "Checkbox",
    defaultValue: false,
  };
  if ("defaultValue" in data && typeof data.defaultValue === "boolean") {
    out.defaultValue = data.defaultValue;
  }
  return out;
}
