import type { SchemaTreeNodeData } from "../../../model";

export function createDropdownData(data: SchemaTreeNodeData): SchemaTreeNodeData {
  const out: SchemaTreeNodeData = {
    type: "Dropdown",
    required: true,
    defaultValue: "",
    transferOptionMetaToParent: false,
  };
  if ("required" in data) {
    out.required = data.required;
  }
  if ("defaultValue" in data && typeof data.defaultValue === "string") {
    out.defaultValue = data.defaultValue;
  }
  if ("transferOptionMetaToParent" in data) {
    out.transferOptionMetaToParent = data.transferOptionMetaToParent;
  }
  return out;
}
