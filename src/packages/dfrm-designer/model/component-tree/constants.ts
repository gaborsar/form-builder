import { createId } from "../../utils/id";
import type { ComponentTreeState } from "./state";

export const emptyComponentTreeState: ComponentTreeState = {
  query: "",
  path: [],
  root: {
    id: createId(),
    visible: true,
    collapsible: true,
    collapsed: false,
    data: {
      type: "Parent",
      name: "",
      label: {},
    },
    children: [],
  },
};
