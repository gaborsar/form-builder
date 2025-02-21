import type { ComponentTreeNodeData } from "../../../model";
import { createId } from "../../../utils/id";
import type { Node } from "../../../utils/tree";

export function createLeafNode(): Node<ComponentTreeNodeData> {
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
          collapsible: false,
          collapsed: false,
          data: {
            type: "ShortText",
            required: true,
            defaultValue: "",
            minLength: null,
            maxLength: null,
            pattern: "",
          },
          children: [],
        },
      },
    },
    children: [],
  };
}
