import type { SchemaTreeNodeData } from "../../../model";

export function createFieldGroupListData(data: SchemaTreeNodeData): SchemaTreeNodeData {
  const out: SchemaTreeNodeData = {
    type: "FieldGroupList",
    key: "",
    label: {},
    minLength: null,
    maxLength: null,
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
