import type { ComponentSchemaTreeNodeData } from "../../../model";

export function createRadioGroupData(
  data: ComponentSchemaTreeNodeData,
): ComponentSchemaTreeNodeData {
  const out: ComponentSchemaTreeNodeData = {
    type: "RadioGroup",
    required: true,
    defaultValue: "",
    transferOptionMetaToParent: false,
    direction: "vertical",
    columns: 1,
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
  if ("direction" in data) {
    out.direction = data.direction;
  }
  if ("columns" in data) {
    out.columns = data.columns;
  }
  return out;
}
