import { type BottomPanelAction, bottomPanelReducer } from "../bottom-panel";
import type { ComponentSchemaTreeAction } from "../component-schema-tree";
import {
  type ComponentTreeAction,
  componentTreeReducer,
  handleComponentSchemaTreeAction,
} from "../component-tree";
import {
  type ComponentTreeConfigAction,
  componentTreeConfigReducer,
} from "../component-tree-config";
import type { EditStackItem } from "../edit-stack";
import { type EditorAction, EditorTabType, editorReducer } from "../editor";
import { type ExplorerAction, explorerReducer } from "../explorer";
import type { FormSchemaTreeAction } from "../form-schema-tree";
import { type FormTreeAction, formTreeReducer, handleFormSchemaTreeAction } from "../form-tree";
import { type FormTreeConfigAction, formTreeConfigReducer } from "../form-tree-config";
import { type IntlAction, intlReducer } from "../intl";
import { type LayoutAction, layoutReducer } from "../layout";
import { type LeftPanelAction, leftPanelReducer } from "../left-panel";
import { type RightPanelAction, rightPanelReducer } from "../right-panel";
import { type SchemaTreeConfigAction, schemaTreeConfigReducer } from "../schema-tree-config";
import { type TagTreeAction, tagTreeReducer } from "../tag-tree";
import { type TagTreeLeafConfigAction, tagTreeLeafConfigReducer } from "../tag-tree-leaf-config";
import {
  type TagTreeParentConfigAction,
  tagTreeParentConfigReducer,
} from "../tag-tree-parent-config";
import { type ToolboxAction, toolboxReducer } from "../toolbox";
import type { Action } from "./actions";
import { emptyState } from "./constants";
import type { State } from "./state";

export function reducer(state: State | undefined, action: Action): State {
  if (state === undefined) {
    return reducer(emptyState, action);
  }
  if (action.type === "reset") {
    return emptyState;
  }
  if (action.type === "load") {
    return {
      ...emptyState,
      undo: [],
      redo: [],
      value: action.payload.value,
    };
  }
  if (action.type === "save") {
    return {
      ...state,
      value: {
        ...state.value,
        filename: action.payload.filename,
      },
    };
  }
  if (isIntlAction(action)) {
    const intl = intlReducer(state.intl, action);
    if (state.intl === intl) {
      return state;
    }
    return { ...state, intl };
  }
  if (isLayoutAction(action)) {
    const layout = layoutReducer(state.layout, action);
    if (state.layout === layout) {
      return state;
    }
    return { ...state, layout };
  }
  if (isLeftPanelAction(action)) {
    const leftPanel = leftPanelReducer(state.leftPanel, action);
    if (state.leftPanel === leftPanel) {
      return state;
    }
    return { ...state, leftPanel };
  }
  if (isRightPanelAction(action)) {
    const rightPanel = rightPanelReducer(state.rightPanel, action);
    if (state.rightPanel === rightPanel) {
      return state;
    }
    return { ...state, rightPanel };
  }
  if (isBottomPanelAction(action)) {
    const bottomPanel = bottomPanelReducer(state.bottomPanel, action);
    if (state.bottomPanel === bottomPanel) {
      return state;
    }
    return { ...state, bottomPanel };
  }
  if (isExplorerAction(action)) {
    const explorer = explorerReducer(state.explorer, action);
    if (state.explorer === explorer) {
      return state;
    }
    return { ...state, explorer };
  }
  if (isTagTreeParentConfigAction(action)) {
    const tagTreeParentConfig = tagTreeParentConfigReducer(state.tagTreeParentConfig, action);
    if (state.tagTreeParentConfig === tagTreeParentConfig) {
      return state;
    }
    return { ...state, tagTreeParentConfig };
  }
  if (isTagTreeLeafConfigAction(action)) {
    const tagTreeLeafConfig = tagTreeLeafConfigReducer(state.tagTreeLeafConfig, action);
    if (state.tagTreeLeafConfig === tagTreeLeafConfig) {
      return state;
    }
    return { ...state, tagTreeLeafConfig };
  }
  if (isFormTreeConfigAction(action)) {
    const formTreeConfig = formTreeConfigReducer(state.formTreeConfig, action);
    if (state.formTreeConfig === formTreeConfig) {
      return state;
    }
    return { ...state, formTreeConfig };
  }
  if (isComponentTreeConfigAction(action)) {
    const componentTreeConfig = componentTreeConfigReducer(state.componentTreeConfig, action);
    if (state.componentTreeConfig === componentTreeConfig) {
      return state;
    }
    return { ...state, componentTreeConfig };
  }
  if (isSchemaTreeConfigAction(action)) {
    const schemaTreeConfig = schemaTreeConfigReducer(state.schemaTreeConfig, action);
    if (state.schemaTreeConfig === schemaTreeConfig) {
      return state;
    }
    return { ...state, schemaTreeConfig };
  }
  if (isEditorAction(action)) {
    const editor = editorReducer(state.editor, action);
    if (state.editor === editor) {
      return state;
    }
    return { ...state, editor };
  }
  if (isToolboxAction(action)) {
    const toolbox = toolboxReducer(state.toolbox, action);
    if (state.toolbox === toolbox) {
      return state;
    }
    return { ...state, toolbox };
  }
  if (action.type === "undo") {
    return handleUndo(state);
  }
  if (action.type === "redo") {
    return handleRedo(state);
  }
  return handleChange(state, action);
}

function handleUndo(state: State): State {
  const { undo, redo, value } = state;
  if (undo.length === 0) {
    return state;
  }
  return {
    ...state,
    undo: undo.slice(0, -1),
    redo: redo.concat(value),
    value: undo[undo.length - 1],
  };
}

function handleRedo(state: State): State {
  const { undo, redo, value } = state;
  if (redo.length === 0) {
    return state;
  }
  return {
    ...state,
    undo: undo.concat(value),
    redo: redo.slice(0, -1),
    value: redo[redo.length - 1],
  };
}

function handleChange(
  state: State,
  action:
    | TagTreeAction
    | FormTreeAction
    | ComponentTreeAction
    | FormSchemaTreeAction
    | ComponentSchemaTreeAction,
): State {
  const { undo, value } = state;
  const nextValue = updateValue(state, action);
  if (value === nextValue) {
    return state;
  }
  return {
    ...state,
    undo: undo.concat(value),
    redo: [],
    value: nextValue,
  };
}

function updateValue(
  state: State,
  action:
    | TagTreeAction
    | FormTreeAction
    | ComponentTreeAction
    | FormSchemaTreeAction
    | ComponentSchemaTreeAction,
): EditStackItem {
  const { value } = state;
  if (isTagTreeAction(action)) {
    const tagTree = tagTreeReducer(value.tagTree, action);
    if (value.tagTree === tagTree) {
      return value;
    }
    return { ...value, tagTree };
  }
  if (isFormTreeAction(action)) {
    const formTree = formTreeReducer(value.formTree, action);
    if (value.formTree === formTree) {
      return value;
    }
    return { ...value, formTree };
  }
  if (isComponentTreeAction(action)) {
    const componentTree = componentTreeReducer(value.componentTree, action);
    if (value.componentTree === componentTree) {
      return value;
    }
    return { ...value, componentTree };
  }
  if (isFormSchemaTreeAction(action)) {
    const {
      editor: { tabs, index },
    } = state;
    if (tabs.length === 0 || index === -1) {
      return value;
    }
    const tab = tabs[index];
    if (tab.type !== EditorTabType.Form) {
      return value;
    }
    const formTree = handleFormSchemaTreeAction(value.formTree, action, tab.path);
    if (value.formTree === formTree) {
      return value;
    }
    return { ...value, formTree };
  }
  if (isComponentSchemaTreeAction(action)) {
    const {
      editor: { tabs, index },
    } = state;
    if (tabs.length === 0 || index === -1) {
      return value;
    }
    const tab = tabs[index];
    if (tab.type !== EditorTabType.Component) {
      return value;
    }
    const componentTree = handleComponentSchemaTreeAction(value.componentTree, action, tab.path);
    if (value.componentTree === componentTree) {
      return value;
    }
    return { ...value, componentTree };
  }
  return value;
}

function isIntlAction(action: Action): action is IntlAction {
  return action.type.startsWith("intl");
}

function isLayoutAction(action: Action): action is LayoutAction {
  return action.type.startsWith("layout");
}

function isLeftPanelAction(action: Action): action is LeftPanelAction {
  return action.type.startsWith("left-panel");
}

function isRightPanelAction(action: Action): action is RightPanelAction {
  return action.type.startsWith("right-panel");
}

function isBottomPanelAction(action: Action): action is BottomPanelAction {
  return action.type.startsWith("bottom-panel");
}

function isExplorerAction(action: Action): action is ExplorerAction {
  return action.type.startsWith("explorer");
}

function isTagTreeParentConfigAction(action: Action): action is TagTreeParentConfigAction {
  return action.type.startsWith("tag-tree-parent-config");
}

function isTagTreeLeafConfigAction(action: Action): action is TagTreeLeafConfigAction {
  return action.type.startsWith("tag-tree-leaf-config");
}

function isFormTreeConfigAction(action: Action): action is FormTreeConfigAction {
  return action.type.startsWith("form-tree-config");
}

function isComponentTreeConfigAction(action: Action): action is ComponentTreeConfigAction {
  return action.type.startsWith("component-tree-config");
}

function isSchemaTreeConfigAction(action: Action): action is SchemaTreeConfigAction {
  return action.type.startsWith("schema-tree-config");
}

function isEditorAction(action: Action): action is EditorAction {
  return action.type.startsWith("editor");
}

function isToolboxAction(action: Action): action is ToolboxAction {
  return action.type.startsWith("toolbox");
}

function isTagTreeAction(action: Action): action is TagTreeAction {
  return action.type.startsWith("tag-tree");
}

function isFormTreeAction(action: Action): action is FormTreeAction {
  return action.type.startsWith("form-tree");
}

function isComponentTreeAction(action: Action): action is ComponentTreeAction {
  return action.type.startsWith("component-tree");
}

function isFormSchemaTreeAction(action: Action): action is FormSchemaTreeAction {
  return action.type.startsWith("form-schema-tree");
}

function isComponentSchemaTreeAction(action: Action): action is ComponentSchemaTreeAction {
  return action.type.startsWith("component-schema-tree");
}
