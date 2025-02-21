import type { ComponentSchemaTreeNodeData } from "../../../model";

export function createTimeData(data: ComponentSchemaTreeNodeData): ComponentSchemaTreeNodeData {
  const out: ComponentSchemaTreeNodeData = {
    type: "Time",
    required: true,
    defaultValue: "",
  };
  if ("required" in data) {
    out.required = data.required;
  }
  return out;
}
