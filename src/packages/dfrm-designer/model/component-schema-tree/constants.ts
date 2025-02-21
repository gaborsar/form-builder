import { createId } from "../../utils/id";
import type { ComponentSchemaTreeState } from "./state";

export const emptyComponentSchemaTreeState: ComponentSchemaTreeState = {
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
};
