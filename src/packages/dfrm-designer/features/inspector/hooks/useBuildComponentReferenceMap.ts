import { equals } from "ramda";
import React from "react";
import type { FormTreeNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { ComponentReference, ComponentReferenceMap } from "../state/types";

export function useBuildComponentReferenceMap(
  formTreeRoot: Node<FormTreeNodeData>,
): ComponentReferenceMap {
  const [map, setMap] = React.useState<ComponentReferenceMap>({});

  const timeoutRef = React.useRef(0);

  React.useEffect(() => {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      const map = collectFormTreeComponentReferences(formTreeRoot);
      setMap((prevMap) => (equals(prevMap, map) ? prevMap : map));
    }, 1000);
    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, [formTreeRoot]);

  return map;
}

interface CollectFormTreeComponentReferencesJob {
  path: string[];
  node: Node<FormTreeNodeData>;
  next: CollectFormTreeComponentReferencesJob | null;
}

function collectFormTreeComponentReferences(root: Node<FormTreeNodeData>) {
  const map: ComponentReferenceMap = {};
  let first: CollectFormTreeComponentReferencesJob | null = {
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
      mergeToComponentReferenceMap(
        map,
        collectFormSchemaTreeComponentReferences(nextPath.slice(1), node.data.schemaTree.root),
      );
    }
    first = first.next;
  }
  return map;
}

interface CollectFormSchemaTreeComponentReferencesJob {
  path: string[];
  node: Node<SchemaTreeNodeData>;
  next: CollectFormSchemaTreeComponentReferencesJob | null;
}

function collectFormSchemaTreeComponentReferences(
  formTreePath: string[],
  root: Node<SchemaTreeNodeData>,
) {
  const map: ComponentReferenceMap = {};
  let first: CollectFormSchemaTreeComponentReferencesJob | null = {
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
    if (node.data.type === "Component") {
      pushToComponentReferenceMap(map, node.data.component, {
        formTreePath,
        schemaTreePath: nextPath.slice(1),
      });
    }
    first = first.next;
  }
  return map;
}

function mergeToComponentReferenceMap(
  mapA: ComponentReferenceMap,
  mapB: ComponentReferenceMap,
): void {
  for (const [id, refs] of Object.entries(mapB)) {
    for (const ref of refs) {
      pushToComponentReferenceMap(mapA, id, ref);
    }
  }
}

function pushToComponentReferenceMap(
  map: ComponentReferenceMap,
  id: string,
  ref: ComponentReference,
): void {
  if (id in map) {
    map[id].push(ref);
  } else {
    map[id] = [ref];
  }
}
