import { emptyComponentTreeState } from "../component-tree";
import { emptyFormTreeState } from "../form-tree";
import { emptyTagTreeState } from "../tag-tree";
import type { EditStackItem } from "./state";

export const emptyEditStackItem: EditStackItem = {
  filename: "",
  tagTree: emptyTagTreeState,
  formTree: emptyFormTreeState,
  componentTree: emptyComponentTreeState,
};
