import type { SchemaTreeNodeData } from "../../../model";

export function createFieldData(data: SchemaTreeNodeData): SchemaTreeNodeData {
  const out: SchemaTreeNodeData = {
    type: "Field",
    key: "",
    label: {},
  };
  if ("key" in data) {
    out.key = data.key;
  }
  if ("label" in data) {
    out.label = data.label;
  }
  return out;
}
