import type { SchemaTreeNodeData } from "../../../model";

export function createDateData(data: SchemaTreeNodeData): SchemaTreeNodeData {
  const out: SchemaTreeNodeData = {
    type: "Date",
    required: true,
    defaultValue: "",
  };
  if ("required" in data) {
    out.required = data.required;
  }
  return out;
}
