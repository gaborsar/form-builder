import { createId } from "../../utils/id";
import {
  type Node,
  cloneNode,
  findNodeByPath,
  insertNodeAfter,
  replaceNode,
  updateNode,
} from "../../utils/tree";
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
import { type FormSchemaTreeAction, formSchemaTreeReducer } from "../form-schema-tree";
import type { SchemaTreeNodeData } from "../schema-tree";
import type {
  FormTreeAction,
  FormTreeRemoveComponentReferencesAction,
  FormTreeRemoveTagReferencesAction,
  FormTreeUpdatePreviewState,
} from "./actions";
import type { FormTreeNodeData, FormTreeState } from "./state";

export function formTreeReducer(state: FormTreeState, action: FormTreeAction): FormTreeState {
  if (action.type === "form-tree__expand-all") {
    return handleExpandAll(state);
  }
  if (action.type === "form-tree__collapse-all") {
    return handleCollapseAll(state);
  }
  if (action.type === "form-tree__search") {
    return handleSearch(state, action);
  }
  if (action.type === "form-tree__select") {
    return handleSelect(state, action);
  }
  if (action.type === "form-tree__append") {
    return handleAppend(state, action);
  }
  if (action.type === "form-tree__insert-before") {
    return handleInsertBefore(state, action);
  }
  if (action.type === "form-tree__insert-after") {
    return handleInsertAfter(state, action);
  }
  if (action.type === "form-tree__replace") {
    return handleReplace(state, action);
  }
  if (action.type === "form-tree__remove") {
    return handleRemove(state, action);
  }
  if (action.type === "form-tree__toggle") {
    return handleToggle(state, action);
  }
  if (action.type === "form-tree__duplicate") {
    return handleDuplicate(state, action);
  }
  if (action.type === "form-tree__move-up") {
    return handleMoveUp(state, action);
  }
  if (action.type === "form-tree__move-down") {
    return handleMoveDown(state, action);
  }
  if (action.type === "form-tree__update-preview-state") {
    return handleUpdatePreviewState(state, action);
  }
  if (action.type === "form-tree__remove-tag-references") {
    return handleRemoveTagReferences(state, action);
  }
  if (action.type === "form-tree__remove-component-references") {
    return handleRemoveComponentReferences(state, action);
  }
  return action;
}

function handleDuplicate(
  { root, ...state }: FormTreeState,
  { payload: { path } }: ExplorerTreeDuplicateAction,
): FormTreeState {
  return {
    ...state,
    root: insertNodeAfter(root, path, cloneFormTreeNode(findNodeByPath(root, path))),
  };
}

function cloneFormTreeNode(node: Node<FormTreeNodeData>): Node<FormTreeNodeData> {
  if (node.data.type === "Parent") {
    return {
      ...node,
      id: createId(),
      children: node.children.map(cloneFormTreeNode),
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
      schemaTree: {
        ...schemaTree,
        root: cloneNode(root),
      },
    },
  };
}

function handleUpdatePreviewState(
  { root, ...state }: FormTreeState,
  { payload: { path, previewState } }: FormTreeUpdatePreviewState,
): FormTreeState {
  return {
    ...state,
    root: updateNode(root, path, (node) => {
      if (node.data.type !== "Leaf") {
        throw new Error();
      }
      return { ...node, data: { ...node.data, previewState } };
    }),
  };
}

function handleRemoveTagReferences(
  { root, ...state }: FormTreeState,
  { payload: { ids } }: FormTreeRemoveTagReferencesAction,
): FormTreeState {
  return { ...state, root: removeTagReferences(root, ids) };
}

function removeTagReferences(node: Node<FormTreeNodeData>, ids: string[]): Node<FormTreeNodeData> {
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
  node: Node<SchemaTreeNodeData>,
  ids: string[],
): Node<SchemaTreeNodeData> {
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

function handleRemoveComponentReferences(
  { root, ...state }: FormTreeState,
  { payload: { ids } }: FormTreeRemoveComponentReferencesAction,
): FormTreeState {
  return { ...state, root: removeComponentReferences(root, ids) };
}

function removeComponentReferences(
  node: Node<FormTreeNodeData>,
  ids: string[],
): Node<FormTreeNodeData> {
  if (node.data.type === "Parent") {
    return {
      ...node,
      children: node.children.map((child) => removeComponentReferences(child, ids)),
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
        root: removeComponentReferencesFromSchemaTreeNode(root, ids),
      },
    },
  };
}

function removeComponentReferencesFromSchemaTreeNode(
  node: Node<SchemaTreeNodeData>,
  ids: string[],
): Node<SchemaTreeNodeData> {
  let out = node;
  if (out.data.type === "Component" && ids.includes(out.data.component)) {
    out.data = { type: "Empty" };
  }
  if (out.children.length !== 0) {
    out = {
      ...out,
      children: out.children.map((child) =>
        removeComponentReferencesFromSchemaTreeNode(child, ids),
      ),
    };
  }
  return out;
}

export function handleFormSchemaTreeAction(
  state: FormTreeState,
  action: FormSchemaTreeAction,
  path: string[],
): FormTreeState {
  const { root } = state;
  const node = findNodeByPath(root, path);
  if (node.data.type === "Parent") {
    return state;
  }
  const { data } = node;
  const { schemaTree } = data;
  const nextSchemaTree = formSchemaTreeReducer(schemaTree, action);
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
