import type { ComponentSchemaTreeNodeData } from "../../../model";

export function createPhoneNumberData(
  data: ComponentSchemaTreeNodeData,
): ComponentSchemaTreeNodeData {
  const out: ComponentSchemaTreeNodeData = {
    type: "PhoneNumber",
    required: true,
    defaultValue: "",
  };
  if ("required" in data) {
    out.required = data.required;
  }
  return out;
}
