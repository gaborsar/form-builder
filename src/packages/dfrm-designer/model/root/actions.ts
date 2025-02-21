import type { BottomPanelAction } from "../bottom-panel";
import type { ComponentSchemaTreeAction } from "../component-schema-tree";
import type { ComponentTreeAction } from "../component-tree";
import type { ComponentTreeConfigAction } from "../component-tree-config";
import type { EditStackItem } from "../edit-stack";
import type { EditorAction } from "../editor";
import type { ExplorerAction } from "../explorer";
import type { FormSchemaTreeAction } from "../form-schema-tree";
import type { FormTreeAction } from "../form-tree";
import type { FormTreeConfigAction } from "../form-tree-config";
import type { IntlAction } from "../intl";
import type { LayoutAction } from "../layout";
import type { LeftPanelAction } from "../left-panel";
import type { RightPanelAction } from "../right-panel";
import type { SchemaTreeConfigAction } from "../schema-tree-config";
import type { TagTreeAction } from "../tag-tree";
import type { TagTreeLeafConfigAction } from "../tag-tree-leaf-config";
import type { TagTreeParentConfigAction } from "../tag-tree-parent-config";
import type { ToolboxAction } from "../toolbox";

export type Action =
  | ResetAction
  | LoadAction
  | SaveAction
  | UndoAction
  | RedoAction
  | IntlAction
  | LayoutAction
  | LeftPanelAction
  | RightPanelAction
  | BottomPanelAction
  | ExplorerAction
  | TagTreeParentConfigAction
  | TagTreeLeafConfigAction
  | FormTreeConfigAction
  | ComponentTreeConfigAction
  | SchemaTreeConfigAction
  | EditorAction
  | ToolboxAction
  | TagTreeAction
  | FormTreeAction
  | ComponentTreeAction
  | FormSchemaTreeAction
  | ComponentSchemaTreeAction;

export interface ResetAction {
  type: "reset";
}

export interface LoadAction {
  type: "load";
  payload: { value: EditStackItem };
}

export interface SaveAction {
  type: "save";
  payload: { filename: string };
}

export interface UndoAction {
  type: "undo";
}

export interface RedoAction {
  type: "redo";
}
