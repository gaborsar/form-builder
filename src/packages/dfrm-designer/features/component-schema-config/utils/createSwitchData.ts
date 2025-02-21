import type { ComponentSchemaTreeNodeData } from "../../../model";

export function createSwitchData(data: ComponentSchemaTreeNodeData): ComponentSchemaTreeNodeData {
  const out: ComponentSchemaTreeNodeData = {
    type: "Switch",
    defaultValue: false,
  };
  if ("defaultValue" in data && typeof data.defaultValue === "boolean") {
    out.defaultValue = data.defaultValue;
  }
  return out;
}
