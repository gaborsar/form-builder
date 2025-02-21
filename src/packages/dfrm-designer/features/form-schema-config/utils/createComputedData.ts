import type { SchemaTreeNodeData } from "../../../model";

export function createComputedData(data: SchemaTreeNodeData): SchemaTreeNodeData {
  const out: SchemaTreeNodeData = {
    type: "Computed",
    template: "",
    unit: {},
  };
  if ("unit" in data) {
    out.unit = data.unit;
  }
  return out;
}
