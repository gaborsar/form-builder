import type { BottomPanelState } from "../bottom-panel";
import type { ComponentTreeConfigState } from "../component-tree-config";
import type { EditStackItem } from "../edit-stack";
import type { EditorState } from "../editor";
import type { ExplorerState } from "../explorer";
import type { FormTreeConfigState } from "../form-tree-config";
import type { IntlState } from "../intl";
import type { LayoutState } from "../layout";
import type { LeftPanelState } from "../left-panel";
import type { RightPanelState } from "../right-panel";
import type { SchemaTreeConfigState } from "../schema-tree-config";
import type { TagTreeLeafConfigState } from "../tag-tree-leaf-config";
import type { TagTreeParentConfigState } from "../tag-tree-parent-config";
import type { ToolboxState } from "../toolbox";

export interface State {
  version: 1;
  intl: IntlState;
  layout: LayoutState;
  leftPanel: LeftPanelState;
  rightPanel: RightPanelState;
  bottomPanel: BottomPanelState;
  explorer: ExplorerState;
  tagTreeParentConfig: TagTreeParentConfigState;
  tagTreeLeafConfig: TagTreeLeafConfigState;
  formTreeConfig: FormTreeConfigState;
  componentTreeConfig: ComponentTreeConfigState;
  schemaTreeConfig: SchemaTreeConfigState;
  editor: EditorState;
  toolbox: ToolboxState;
  savedValue: EditStackItem | null;
  undo: EditStackItem[];
  redo: EditStackItem[];
  value: EditStackItem;
}
