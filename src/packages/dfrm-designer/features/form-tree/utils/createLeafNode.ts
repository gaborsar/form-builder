import type { FormTreeNodeData } from "../../../model";
import { createId } from "../../../utils/id";
import type { Node } from "../../../utils/tree";

export function createLeafNode(): Node<FormTreeNodeData> {
  return {
    id: createId(),
    visible: true,
    collapsible: false,
    collapsed: false,
    data: {
      type: "Leaf",
      name: "",
      label: {},
      schemaTree: {
        query: "",
        path: [],
        root: {
          id: createId(),
          visible: true,
          collapsible: true,
          collapsed: false,
          data: {
            type: "Form",
          },
          children: [],
        },
      },
      previewState: {
        optimizedValue: {},
        renderResult: null,
        flatResult: null,
      },
    },
    children: [],
  };
}
