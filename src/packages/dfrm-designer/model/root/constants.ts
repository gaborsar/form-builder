import { emptyBottomPanelState } from "../bottom-panel";
import { emptyComponentTreeConfigState } from "../component-tree-config";
import { emptyEditStackItem } from "../edit-stack";
import { emptyEditorState } from "../editor";
import { emptyExplorerState } from "../explorer";
import { emptyFormTreeConfigState } from "../form-tree-config";
import { emptyIntlState } from "../intl";
import { emptyLayoutState } from "../layout";
import { emptyLeftPanelState } from "../left-panel";
import { emptyRightPanelState } from "../right-panel";
import { emptySchemaTreeConfigState } from "../schema-tree-config";
import { emptyTagTreeLeafConfigState } from "../tag-tree-leaf-config";
import { emptyTagTreeParentConfigState } from "../tag-tree-parent-config";
import { emptyToolboxState } from "../toolbox";
import type { State } from "./state";

export const CURRENT_MODEL_VERSION = 1;

export const emptyState: State = {
  version: 1,
  intl: emptyIntlState,
  layout: emptyLayoutState,
  leftPanel: emptyLeftPanelState,
  rightPanel: emptyRightPanelState,
  bottomPanel: emptyBottomPanelState,
  explorer: emptyExplorerState,
  tagTreeParentConfig: emptyTagTreeParentConfigState,
  tagTreeLeafConfig: emptyTagTreeLeafConfigState,
  formTreeConfig: emptyFormTreeConfigState,
  componentTreeConfig: emptyComponentTreeConfigState,
  schemaTreeConfig: emptySchemaTreeConfigState,
  editor: emptyEditorState,
  toolbox: emptyToolboxState,
  savedValue: null,
  undo: [],
  redo: [],
  value: emptyEditStackItem,
};
