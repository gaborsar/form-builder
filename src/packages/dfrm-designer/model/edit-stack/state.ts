import type { ComponentTreeState } from "../component-tree";
import type { FormTreeState } from "../form-tree";
import type { TagTreeState } from "../tag-tree";

export interface EditStackItem {
  filename: string;
  tagTree: TagTreeState;
  formTree: FormTreeState;
  componentTree: ComponentTreeState;
}
