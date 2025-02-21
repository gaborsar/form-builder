import type { ComponentSchemaTreeNodeData } from "../../../model";

export function createComputedData(data: ComponentSchemaTreeNodeData): ComponentSchemaTreeNodeData {
  const out: ComponentSchemaTreeNodeData = {
    type: "Computed",
    template: "",
    unit: {},
  };
  if ("unit" in data) {
    out.unit = data.unit;
  }
  return out;
}
