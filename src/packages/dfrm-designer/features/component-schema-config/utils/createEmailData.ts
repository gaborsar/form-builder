import type { ComponentSchemaTreeNodeData } from "../../../model";

export function createEmailData(data: ComponentSchemaTreeNodeData): ComponentSchemaTreeNodeData {
  const out: ComponentSchemaTreeNodeData = {
    type: "Email",
    required: true,
    defaultValue: "",
  };
  if ("required" in data) {
    out.required = data.required;
  }
  return out;
}
