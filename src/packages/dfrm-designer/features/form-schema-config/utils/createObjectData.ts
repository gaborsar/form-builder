import type { SchemaTreeNodeData } from "../../../model";

export function createObjectData(data: SchemaTreeNodeData): SchemaTreeNodeData {
  const out: SchemaTreeNodeData = {
    type: "Object",
    key: "",
  };
  if ("key" in data) {
    out.key = data.key;
  }
  return out;
}
