import { createId } from "../../utils/id";
import type { FormSchemaTreeState } from "./state";

export const emptyFormSchemaTreeState: FormSchemaTreeState = {
  query: "",
  path: [],
  root: {
    id: createId(),
    visible: true,
    collapsible: true,
    collapsed: false,
    data: { type: "Form" },
    children: [],
  },
};
