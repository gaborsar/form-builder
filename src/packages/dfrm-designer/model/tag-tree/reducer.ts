import type { Node } from "../../utils/tree";
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
import type { TagTreeAction, TagTreeRemoveTagReferencesAction } from "./actions";
import type { TagTreeNodeData, TagTreeState } from "./state";

export function tagTreeReducer(state: TagTreeState, action: TagTreeAction): TagTreeState {
  if (action.type === "tag-tree__expand-all") {
    return handleExpandAll(state);
  }
  if (action.type === "tag-tree__collapse-all") {
    return handleCollapseAll(state);
  }
  if (action.type === "tag-tree__search") {
    return handleSearch(state, action);
  }
  if (action.type === "tag-tree__select") {
    return handleSelect(state, action);
  }
  if (action.type === "tag-tree__append") {
    return handleAppend(state, action);
  }
  if (action.type === "tag-tree__insert-before") {
    return handleInsertBefore(state, action);
  }
  if (action.type === "tag-tree__insert-after") {
    return handleInsertAfter(state, action);
  }
  if (action.type === "tag-tree__replace") {
    return handleReplace(state, action);
  }
  if (action.type === "tag-tree__remove") {
    return handleRemove(state, action);
  }
  if (action.type === "tag-tree__toggle") {
    return handleToggle(state, action);
  }
  if (action.type === "tag-tree__duplicate") {
    return handleDuplicate(state, action);
  }
  if (action.type === "tag-tree__move-up") {
    return handleMoveUp(state, action);
  }
  if (action.type === "tag-tree__move-down") {
    return handleMoveDown(state, action);
  }
  if (action.type === "tag-tree__remove-tag-references") {
    return handleRemoveTagReferences(state, action);
  }
  return state;
}

function handleRemoveTagReferences(
  { root, ...state }: TagTreeState,
  { payload: { ids } }: TagTreeRemoveTagReferencesAction,
): TagTreeState {
  return { ...state, root: removeTagReferences(root, ids) };
}

function removeTagReferences(node: Node<TagTreeNodeData>, ids: string[]): Node<TagTreeNodeData> {
  return node.data.type === "Parent"
    ? {
        ...node,
        children: node.children.map((child) => removeTagReferences(child, ids)),
      }
    : {
        ...node,
        data: {
          ...node.data,
          relations: node.data.relations.filter((relation) => !ids.includes(relation.id)),
        },
      };
}
