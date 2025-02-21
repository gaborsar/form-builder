import { equals } from "ramda";
import React from "react";
import type {
  ComponentSchemaTreeNodeData,
  ComponentTreeNodeData,
  FormTreeNodeData,
  SchemaTreeNodeData,
  TagTreeNodeData,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import type { TagReference, TagReferenceMap } from "../state/types";

export function useBuildTagReferenceMap(
  tagTreeRoot: Node<TagTreeNodeData>,
  formTreeRoot: Node<FormTreeNodeData>,
  componentTreeRoot: Node<ComponentTreeNodeData>,
): TagReferenceMap {
  const [map, setMap] = React.useState<TagReferenceMap>({});
  const timeoutRef = React.useRef(0);
  React.useEffect(() => {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      const map: TagReferenceMap = {};
      mergeToTagReferenceMap(map, collectTagTreeTagReferences(tagTreeRoot));
      mergeToTagReferenceMap(map, collectFormTreeTagReferences(formTreeRoot));
      mergeToTagReferenceMap(map, collectComponentTreeTagReferences(componentTreeRoot));
      setMap((prevMap) => (equals(prevMap, map) ? prevMap : map));
    }, 1000);
    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, [tagTreeRoot, formTreeRoot, componentTreeRoot]);
  return map;
}

interface CollectTagTreeTagReferencesJob {
  path: string[];
  node: Node<TagTreeNodeData>;
  next: CollectTagTreeTagReferencesJob | null;
}

function collectTagTreeTagReferences(root: Node<TagTreeNodeData>) {
  const map: TagReferenceMap = {};
  let first: CollectTagTreeTagReferencesJob | null = {
    path: [],
    node: root,
    next: null,
  };
  let last = first;
  while (first !== null) {
    const { path, node } = first;
    const nextPath = path.concat(node.id);
    if (node.data.type === "Parent") {
      for (const child of node.children) {
        last.next = { path: nextPath, node: child, next: null };
        last = last.next;
      }
    } else {
      for (const relation of node.data.relations) {
        pushToTagReferenceMap(map, relation.id, {
          type: "relation",
          path: nextPath.slice(1),
        });
      }
    }
    first = first.next;
  }
  return map;
}

interface CollectFormTreeTagReferencesJob {
  path: string[];
  node: Node<FormTreeNodeData>;
  next: CollectFormTreeTagReferencesJob | null;
}

function collectFormTreeTagReferences(root: Node<FormTreeNodeData>) {
  const map: TagReferenceMap = {};
  let first: CollectFormTreeTagReferencesJob | null = {
    path: [],
    node: root,
    next: null,
  };
  let last = first;
  while (first !== null) {
    const { path, node } = first;
    const nextPath = path.concat(node.id);
    if (node.data.type === "Parent") {
      for (const child of node.children) {
        last.next = { path: nextPath, node: child, next: null };
        last = last.next;
      }
    } else {
      mergeToTagReferenceMap(
        map,
        collectFormSchemaTreeTagReferences(nextPath.slice(1), node.data.schemaTree.root),
      );
    }
    first = first.next;
  }
  return map;
}

interface CollectFormSchemaTreeTagReferencesJob {
  path: string[];
  node: Node<SchemaTreeNodeData>;
  next: CollectFormSchemaTreeTagReferencesJob | null;
}

function collectFormSchemaTreeTagReferences(
  formTreePath: string[],
  root: Node<SchemaTreeNodeData>,
) {
  const map: TagReferenceMap = {};
  let first: CollectFormSchemaTreeTagReferencesJob | null = {
    path: [],
    node: root,
    next: null,
  };
  let last = first;
  while (first !== null) {
    const { path, node } = first;
    const nextPath = path.concat(node.id);
    for (const child of node.children) {
      last.next = { path: nextPath, node: child, next: null };
      last = last.next;
    }
    if ("id" in node.data && node.data.id !== undefined) {
      pushToTagReferenceMap(map, node.data.id, {
        type: "form-schema-id",
        formTreePath,
        schemaTreePath: nextPath.slice(1),
      });
    }
    if ("tags" in node.data && node.data.tags !== undefined) {
      const ref: TagReference = {
        type: "form-schema-tag",
        formTreePath,
        schemaTreePath: nextPath.slice(1),
      };
      for (const id of node.data.tags) {
        pushToTagReferenceMap(map, id, ref);
      }
    }
    first = first.next;
  }
  return map;
}

interface CollectComponentTreeTagReferencesJob {
  path: string[];
  node: Node<ComponentTreeNodeData>;
  next: CollectComponentTreeTagReferencesJob | null;
}

function collectComponentTreeTagReferences(root: Node<ComponentTreeNodeData>) {
  const map: TagReferenceMap = {};
  let first: CollectComponentTreeTagReferencesJob | null = {
    path: [],
    node: root,
    next: null,
  };
  let last = first;
  while (first !== null) {
    const { path, node } = first;
    const nextPath = path.concat(node.id);
    if (node.data.type === "Parent") {
      for (const child of node.children) {
        last.next = { path: nextPath, node: child, next: null };
        last = last.next;
      }
    } else {
      mergeToTagReferenceMap(
        map,
        collectComponentSchemaTreeTagReferences(nextPath.slice(1), node.data.schemaTree.root),
      );
    }
    first = first.next;
  }
  return map;
}

interface CollectComponentSchemaTreeTagReferencesJob {
  path: string[];
  node: Node<ComponentSchemaTreeNodeData>;
  next: CollectComponentSchemaTreeTagReferencesJob | null;
}

function collectComponentSchemaTreeTagReferences(
  componentTreePath: string[],
  root: Node<ComponentSchemaTreeNodeData>,
) {
  const map: TagReferenceMap = {};
  let first: CollectComponentSchemaTreeTagReferencesJob | null = {
    path: [],
    node: root,
    next: null,
  };
  let last = first;
  while (first !== null) {
    const { path, node } = first;
    const nextPath = path.concat(node.id);
    for (const child of node.children) {
      last.next = { path: nextPath, node: child, next: null };
      last = last.next;
    }
    if ("id" in node.data && node.data.id !== undefined) {
      pushToTagReferenceMap(map, node.data.id, {
        type: "component-schema-id",
        componentTreePath,
        schemaTreePath: nextPath.slice(1),
      });
    }
    if ("tags" in node.data && node.data.tags !== undefined) {
      const ref: TagReference = {
        type: "component-schema-tag",
        componentTreePath,
        schemaTreePath: nextPath.slice(1),
      };
      for (const id of node.data.tags) {
        pushToTagReferenceMap(map, id, ref);
      }
    }
    first = first.next;
  }
  return map;
}

function mergeToTagReferenceMap(mapA: TagReferenceMap, mapB: TagReferenceMap): void {
  for (const [id, refs] of Object.entries(mapB)) {
    for (const ref of refs) {
      pushToTagReferenceMap(mapA, id, ref);
    }
  }
}

function pushToTagReferenceMap(map: TagReferenceMap, id: string, ref: TagReference): void {
  if (id in map) {
    map[id].push(ref);
  } else {
    map[id] = [ref];
  }
}
