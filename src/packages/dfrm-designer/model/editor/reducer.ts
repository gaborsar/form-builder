import { isSamePath } from "../../utils/tree";
import type {
  EditorAction,
  EditorCloseTabAction,
  EditorOpenTabAction,
  EditorSelectMoveTabAction,
  EditorSelectTabAction,
} from "./actions";
import type { EditorState } from "./state";

export function editorReducer(state: EditorState, action: EditorAction): EditorState {
  if (action.type === "editor__select-tab") {
    return handleSelectTab(state, action);
  }
  if (action.type === "editor__select-previous-tab") {
    return handleSelectPreviousTab(state);
  }
  if (action.type === "editor__select-next-tab") {
    return handleSelectNextTab(state);
  }
  if (action.type === "editor__move-tab") {
    return handleMoveTab(state, action);
  }
  if (action.type === "editor__open-tab") {
    return handleOpenTab(state, action);
  }
  if (action.type === "editor__close-tab") {
    return handleCloseTab(state, action);
  }
  return state;
}

function handleSelectTab(
  state: EditorState,
  { payload: { index } }: EditorSelectTabAction,
): EditorState {
  return { ...state, index };
}

function handleSelectPreviousTab(state: EditorState): EditorState {
  return {
    ...state,
    index: Math.max(state.index - 1, 0),
  };
}

function handleSelectNextTab(state: EditorState): EditorState {
  return {
    ...state,
    index: Math.min(state.index + 1, state.tabs.length - 1),
  };
}

function handleMoveTab(
  state: EditorState,
  { payload: { source, target } }: EditorSelectMoveTabAction,
): EditorState {
  if (source === target) {
    return state;
  }
  const { tabs } = state;
  return source < target
    ? {
        ...state,
        tabs: [
          ...tabs.slice(0, source),
          ...tabs.slice(source + 1, target),
          tabs[target],
          tabs[source],
          ...tabs.slice(target + 1),
        ],
        index: target,
      }
    : {
        ...state,
        tabs: [
          ...tabs.slice(0, target),
          tabs[source],
          tabs[target],
          ...tabs.slice(target + 1, source),
          ...tabs.slice(source + 1),
        ],
        index: target,
      };
}

function handleOpenTab(
  { tabs, index: currentIndex, ...state }: EditorState,
  { payload: { type, path } }: EditorOpenTabAction,
): EditorState {
  const alreadyOpenIndex = tabs.findIndex((tab) => tab.type === type && isSamePath(tab.path, path));
  if (alreadyOpenIndex !== -1) {
    return { ...state, tabs, index: alreadyOpenIndex };
  }
  const nextIndex = Math.min(currentIndex, tabs.length - 1) + 1;
  return {
    ...state,
    tabs: [...tabs.slice(0, nextIndex), { type, path }, ...tabs.slice(nextIndex)],
    index: nextIndex,
  };
}

function handleCloseTab(
  { tabs: currentTabs, index: currentIndex, ...state }: EditorState,
  { payload }: EditorCloseTabAction,
): EditorState {
  let nextTabs = currentTabs;
  if ("index" in payload) {
    const { index } = payload;
    nextTabs = nextTabs.slice(0, index).concat(nextTabs.slice(index + 1));
  } else if ("path" in payload) {
    const { path } = payload;
    const p = path.join("/");
    nextTabs = currentTabs.filter((t) => !t.path.join("/").startsWith(p));
  }

  let nextIndex = currentIndex;
  if (nextTabs.length === 0) {
    nextIndex = -1;
  } else {
    const currentTab = currentTabs[currentIndex];
    nextIndex = nextTabs.findIndex((t) => t === currentTab) || 0;
  }

  return { ...state, tabs: nextTabs, index: nextIndex };
}
