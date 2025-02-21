import type { ComponentSchemaTreeNodeData } from "../../../model";

export function createSwitchGroupData(
  data: ComponentSchemaTreeNodeData,
): ComponentSchemaTreeNodeData {
  const out: ComponentSchemaTreeNodeData = {
    type: "SwitchGroup",
    required: true,
    defaultValue: [],
    direction: "vertical",
    columns: 1,
  };
  if ("required" in data) {
    out.required = data.required;
  }
  if ("defaultValue" in data && Array.isArray(data.defaultValue)) {
    out.defaultValue = data.defaultValue;
  }
  if ("direction" in data) {
    out.direction = data.direction;
  }
  if ("columns" in data) {
    out.columns = data.columns;
  }
  return out;
}
