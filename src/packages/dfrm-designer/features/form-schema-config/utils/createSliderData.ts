import type { SchemaTreeNodeData } from "../../../model";

export function createSliderData(data: SchemaTreeNodeData): SchemaTreeNodeData {
  const out: SchemaTreeNodeData = {
    type: "Slider",
    defaultValue: "",
    transferOptionMetaToParent: false,
  };
  if ("defaultValue" in data && typeof data.defaultValue === "string") {
    out.defaultValue = data.defaultValue;
  }
  if ("transferOptionMetaToParent" in data) {
    out.transferOptionMetaToParent = data.transferOptionMetaToParent;
  }
  return out;
}
