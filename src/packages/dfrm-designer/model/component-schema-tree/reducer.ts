import {
  handleAppend,
  handleCollapseAll,
  handleDuplicate,
  handleExpandAll,
  handleInsertAfter,
  handleInsertBefore,
  handleMoveDown,
  handleMoveUp,
  handleRemove,
  handleReplace,
  handleSearch,
  handleSelect,
  handleToggle,
} from "../explorer-tree";
import type { ComponentSchemaTreeAction } from "./actions";
import type { ComponentSchemaTreeState } from "./state";

export function componentSchemaTreeReducer(
  state: ComponentSchemaTreeState,
  action: ComponentSchemaTreeAction,
): ComponentSchemaTreeState {
  if (action.type === "component-schema-tree__expand-all") {
    return handleExpandAll(state);
  }
  if (action.type === "component-schema-tree__collapse-all") {
    return handleCollapseAll(state);
  }
  if (action.type === "component-schema-tree__search") {
    return handleSearch(state, action);
  }
  if (action.type === "component-schema-tree__select") {
    return handleSelect(state, action);
  }
  if (action.type === "component-schema-tree__append") {
    return handleAppend(state, action);
  }
  if (action.type === "component-schema-tree__insert-before") {
    return handleInsertBefore(state, action);
  }
  if (action.type === "component-schema-tree__insert-after") {
    return handleInsertAfter(state, action);
  }
  if (action.type === "component-schema-tree__replace") {
    return handleReplace(state, action);
  }
  if (action.type === "component-schema-tree__remove") {
    return handleRemove(state, action);
  }
  if (action.type === "component-schema-tree__toggle") {
    return handleToggle(state, action);
  }
  if (action.type === "component-schema-tree__duplicate") {
    return handleDuplicate(state, action);
  }
  if (action.type === "component-schema-tree__move-up") {
    return handleMoveUp(state, action);
  }
  if (action.type === "component-schema-tree__move-down") {
    return handleMoveDown(state, action);
  }
  return state;
}
