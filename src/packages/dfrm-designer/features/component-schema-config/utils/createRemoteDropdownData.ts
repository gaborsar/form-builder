import type { ComponentSchemaTreeNodeData } from "../../../model";

export function createRemoteDropdownData(
  data: ComponentSchemaTreeNodeData,
): ComponentSchemaTreeNodeData {
  const out: ComponentSchemaTreeNodeData = {
    type: "RemoteDropdown",
    path: "",
    required: true,
  };
  if ("path" in data) {
    out.path = data.path;
  }
  if ("required" in data) {
    out.required = data.required;
  }
  return out;
}
