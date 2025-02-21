import type { ComponentSchemaTreeNodeData } from "../../../model";

export function createSliderData(data: ComponentSchemaTreeNodeData): ComponentSchemaTreeNodeData {
  const out: ComponentSchemaTreeNodeData = {
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
