import type { ComponentSchemaTreeNodeData } from "../../../model";

export function createDateTimeData(data: ComponentSchemaTreeNodeData): ComponentSchemaTreeNodeData {
  const out: ComponentSchemaTreeNodeData = {
    type: "DateTime",
    required: true,
    defaultValue: "",
  };
  if ("required" in data) {
    out.required = data.required;
  }
  return out;
}
