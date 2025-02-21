import { createId } from "../../utils/id";
import type { TagTreeState } from "./state";

export const emptyTagTreeState: TagTreeState = {
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
