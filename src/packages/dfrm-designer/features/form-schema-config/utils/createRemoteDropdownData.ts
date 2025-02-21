import type { SchemaTreeNodeData } from "../../../model";

export function createRemoteDropdownData(data: SchemaTreeNodeData): SchemaTreeNodeData {
  const out: SchemaTreeNodeData = {
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
