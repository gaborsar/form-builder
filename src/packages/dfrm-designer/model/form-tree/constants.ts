import { createId } from "../../utils/id";
import type { FormTreeState } from "./state";

export const emptyFormTreeState: FormTreeState = {
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
