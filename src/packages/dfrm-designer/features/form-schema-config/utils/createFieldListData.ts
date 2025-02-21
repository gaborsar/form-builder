import type { SchemaTreeNodeData } from "../../../model";

export function createFieldListData(data: SchemaTreeNodeData): SchemaTreeNodeData {
  const out: SchemaTreeNodeData = {
    type: "FieldList",
    key: "",
    label: {},
    minLength: null,
    maxLength: null,
    unique: false,
  };
  if ("key" in data) {
    out.key = data.key;
  }
  if ("label" in data) {
    out.label = data.label;
  }
  if ("minLength" in data) {
    out.minLength = data.minLength;
  }
  if ("maxLength" in data) {
    out.maxLength = data.maxLength;
  }
  return out;
}
