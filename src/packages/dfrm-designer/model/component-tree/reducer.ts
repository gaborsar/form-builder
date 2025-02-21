import { createId } from "../../utils/id";
import {
  type Node,
  cloneNode,
  findNodeByPath,
  insertNodeAfter,
  replaceNode,
} from "../../utils/tree";
import {
  type ComponentSchemaTreeAction,
  type ComponentSchemaTreeNodeData,
  componentSchemaTreeReducer,
} from "../component-schema-tree";
import {
  type ExplorerTreeDuplicateAction,
  handleAppend,
  handleCollapseAll,
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
import type { ComponentTreeAction, ComponentTreeRemoveTagReferencesAction } from "./actions";
import type { ComponentTreeNodeData, ComponentTreeState } from "./state";

export function componentTreeReducer(
  state: ComponentTreeState,
  action: ComponentTreeAction,
): ComponentTreeState {
  if (action.type === "component-tree__expand-all") {
    return handleExpandAll(state);
  }
  if (action.type === "component-tree__collapse-all") {
    return handleCollapseAll(state);
  }
  if (action.type === "component-tree__search") {
    return handleSearch(state, action);
  }
  if (action.type === "component-tree__select") {
    return handleSelect(state, action);
  }
  if (action.type === "component-tree__append") {
    return handleAppend(state, action);
  }
  if (action.type === "component-tree__insert-before") {
    return handleInsertBefore(state, action);
  }
  if (action.type === "component-tree__insert-after") {
    return handleInsertAfter(state, action);
  }
  if (action.type === "component-tree__replace") {
    return handleReplace(state, action);
  }
  if (action.type === "component-tree__remove") {
    return handleRemove(state, action);
  }
  if (action.type === "component-tree__toggle") {
    return handleToggle(state, action);
  }
  if (action.type === "component-tree__duplicate") {
    return handleDuplicate(state, action);
  }
  if (action.type === "component-tree__move-up") {
    return handleMoveUp(state, action);
  }
  if (action.type === "component-tree__move-down") {
    return handleMoveDown(state, action);
  }
  if (action.type === "component-tree__remove-tag-references") {
    return handleRemoveTagReferences(state, action);
  }
  return action;
}

function handleDuplicate(
  { root, ...state }: ComponentTreeState,
  { payload: { path } }: ExplorerTreeDuplicateAction,
): ComponentTreeState {
  return {
    ...state,
    root: insertNodeAfter(root, path, cloneComponentTreeNode(findNodeByPath(root, path))),
  };
}

function cloneComponentTreeNode(node: Node<ComponentTreeNodeData>): Node<ComponentTreeNodeData> {
  if (node.data.type === "Parent") {
    return {
      ...node,
      id: createId(),
      children: node.children.map(cloneComponentTreeNode),
    };
  }
  const { data } = node;
  const { schemaTree } = data;
  const { root } = schemaTree;
  return {
    ...node,
    id: createId(),
    data: {
      ...data,
      schemaTree: { ...schemaTree, root: cloneNode(root) },
    },
  };
}

function handleRemoveTagReferences(
  { root, ...state }: ComponentTreeState,
  { payload: { ids } }: ComponentTreeRemoveTagReferencesAction,
): ComponentTreeState {
  return { ...state, root: removeTagReferences(root, ids) };
}

function removeTagReferences(
  node: Node<ComponentTreeNodeData>,
  ids: string[],
): Node<ComponentTreeNodeData> {
  if (node.data.type === "Parent") {
    return {
      ...node,
      children: node.children.map((child) => removeTagReferences(child, ids)),
    };
  }
  const { data } = node;
  const { schemaTree } = data;
  const { root } = schemaTree;
  return {
    ...node,
    data: {
      ...data,
      schemaTree: {
        ...schemaTree,
        root: removeTagReferencesFromSchemaTreeNode(root, ids),
      },
    },
  };
}

function removeTagReferencesFromSchemaTreeNode(
  node: Node<ComponentSchemaTreeNodeData>,
  ids: string[],
): Node<ComponentSchemaTreeNodeData> {
  let out = node;
  if ("id" in out.data) {
    if (out.data.id !== undefined && ids.includes(out.data.id)) {
      out = { ...out, data: { ...out.data, id: "" } };
    }
  }
  if ("tags" in out.data) {
    if (out.data.tags !== undefined) {
      out = {
        ...out,
        data: {
          ...out.data,
          tags: out.data.tags.filter((id) => !ids.includes(id)),
        },
      };
    }
  }
  if (out.children.length !== 0) {
    out = {
      ...out,
      children: out.children.map((child) => removeTagReferencesFromSchemaTreeNode(child, ids)),
    };
  }
  return out;
}

export function handleComponentSchemaTreeAction(
  state: ComponentTreeState,
  action: ComponentSchemaTreeAction,
  path: string[],
): ComponentTreeState {
  const { root } = state;
  const node = findNodeByPath(root, path);
  if (node.data.type === "Parent") {
    return state;
  }
  const { data } = node;
  const { schemaTree } = data;
  const nextSchemaTree = componentSchemaTreeReducer(schemaTree, action);
  if (nextSchemaTree === schemaTree) {
    return state;
  }
  const nextNode = {
    ...node,
    data: { ...data, schemaTree: nextSchemaTree },
  };
  const nextRoot = replaceNode(root, path, nextNode);
  return { ...state, path, root: nextRoot };
}
