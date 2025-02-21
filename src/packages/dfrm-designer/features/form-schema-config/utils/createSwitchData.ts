import type { SchemaTreeNodeData } from "../../../model";

export function createSwitchData(data: SchemaTreeNodeData): SchemaTreeNodeData {
  const out: SchemaTreeNodeData = {
    type: "Switch",
    defaultValue: false,
  };
  if ("defaultValue" in data && typeof data.defaultValue === "boolean") {
    out.defaultValue = data.defaultValue;
  }
  return out;
}
