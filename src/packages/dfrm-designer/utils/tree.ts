import { createId } from "./id";

export interface Node<Data, ChildData = Data> {
  id: string;
  visible: boolean;
  collapsible: boolean;
  collapsed: boolean;
  data: Data;
  children: Node<ChildData>[];
}

export function isSamePath(pathA: string[], pathB: string[]): boolean {
  return pathA.join("/") === pathB.join("/");
}

export function findPath<Data>(root: Node<Data>, id: string): string[] {
  return findFullPath(root, id).slice(1);
}

function findFullPath<Data>(root: Node<Data>, id: string): string[] {
  for (const child of root.children) {
    if (child.id === id) {
      return [root.id, child.id];
    }
    const path = findFullPath(child, id);
    if (path.length !== 0) {
      return [root.id].concat(path);
    }
  }
  return [];
}

export function resolvePath<Data>(root: Node<Data>, path: string[]): Node<Data>[] {
  const nodes: Node<Data>[] = [root];
  let node: Node<Data> = root;
  for (const id of path) {
    const child: Node<Data> | undefined = node.children.find((child) => child.id === id);
    if (child === undefined) {
      throw new Error();
    }
    nodes.push(child);
    node = child;
  }
  return nodes;
}

interface FindNodeByIdJob<Data> {
  node: Node<Data>;
  next: FindNodeByIdJob<Data> | null;
}

export function findNodeById<Data>(node: Node<Data>, id: string): Node<Data> {
  let first: FindNodeByIdJob<Data> | null = { node, next: null };
  let last = first;
  while (first !== null) {
    const node = first.node;
    if (node.id === id) {
      return node;
    }
    for (const child of node.children) {
      last.next = { node: child, next: null };
      last = last.next;
    }
    first = first.next;
  }
  throw new Error();
}

export function findNodeByPath<Data>(root: Node<Data>, path: string[]): Node<Data> {
  if (path.length === 0) {
    return root;
  }
  let node: Node<Data> = root;
  for (const id of path) {
    const child = node.children.find((child) => child.id === id);
    if (child === undefined) {
      throw new Error();
    }
    node = child;
  }
  return node;
}

export function cloneNode<Data>(node: Node<Data>): Node<Data> {
  return {
    ...node,
    id: createId(),
    children: node.children.map(cloneNode),
  };
}

export function expandAll<Data>(node: Node<Data>): Node<Data> {
  return {
    ...node,
    collapsed: false,
    children: node.children.map(expandAll),
  };
}

export function collapseAll<Data>(node: Node<Data>): Node<Data> {
  return {
    ...node,
    collapsed: node.collapsible,
    children: node.children.map(collapseAll),
  };
}

export function expandNode<Data>(root: Node<Data>, path: string[]): Node<Data> {
  return updateNode(root, path, (node) => ({
    ...node,
    collapsed: false,
  }));
}

export function toggleNode<Data>(root: Node<Data>, path: string[]): Node<Data> {
  return updateNode(root, path, (node) => ({
    ...node,
    collapsed: node.collapsible && !node.collapsed,
  }));
}

export function collapseNode<Data>(root: Node<Data>, path: string[]): Node<Data> {
  return updateNode(root, path, (node) => ({
    ...node,
    collapsed: node.collapsible,
  }));
}

export function appendNode<Data>(root: Node<Data>, path: string[], node: Node<Data>): Node<Data> {
  if (path.length === 0) {
    return { ...root, children: root.children.concat(node) };
  }
  return {
    ...root,
    children: root.children.map((child) =>
      child.id === path[0] ? appendNode(child, path.slice(1), node) : child,
    ),
  };
}

export function insertNodeBefore<Data>(
  root: Node<Data>,
  path: string[],
  node: Node<Data>,
): Node<Data> {
  if (path.length === 0) {
    throw new Error();
  }
  if (path.length === 1) {
    const index = root.children.findIndex((child) => child.id === path[0]);
    if (index === -1) {
      throw new Error();
    }
    return {
      ...root,
      children: root.children.slice(0, index).concat(node).concat(root.children.slice(index)),
    };
  }
  return {
    ...root,
    children: root.children.map((child) =>
      child.id === path[0] ? insertNodeBefore(child, path.slice(1), node) : child,
    ),
  };
}

export function insertNodeAfter<Data>(
  root: Node<Data>,
  path: string[],
  node: Node<Data>,
): Node<Data> {
  if (path.length === 0) {
    throw new Error();
  }
  if (path.length === 1) {
    const index = root.children.findIndex((child) => child.id === path[0]);
    if (index === -1) {
      throw new Error();
    }
    return {
      ...root,
      children: root.children
        .slice(0, index + 1)
        .concat(node)
        .concat(root.children.slice(index + 1)),
    };
  }
  return {
    ...root,
    children: root.children.map((child) =>
      child.id === path[0] ? insertNodeAfter(child, path.slice(1), node) : child,
    ),
  };
}

export function duplicateNode<Data>(root: Node<Data>, path: string[]): Node<Data> {
  return insertNodeAfter(root, path, cloneNode(findNodeByPath(root, path)));
}

export function removeNode<Data>(root: Node<Data>, path: string[]): Node<Data> {
  if (path.length === 0) {
    throw new Error();
  }
  if (path.length === 1) {
    return {
      ...root,
      children: root.children.filter((child) => child.id !== path[0]),
    };
  }
  return {
    ...root,
    children: root.children.map((child) =>
      child.id === path[0] ? removeNode(child, path.slice(1)) : child,
    ),
  };
}

export function replaceNode<Data>(root: Node<Data>, path: string[], node: Node<Data>): Node<Data> {
  if (path.length === 0) {
    return node;
  }
  if (path.length === 1) {
    return {
      ...root,
      children: root.children.map((child) => (child.id === path[0] ? node : child)),
    };
  }
  return {
    ...root,
    children: root.children.map((child) =>
      child.id === path[0] ? replaceNode(child, path.slice(1), node) : child,
    ),
  };
}

export function updateNode<Data>(
  node: Node<Data>,
  path: string[],
  fn: (node: Node<Data>) => Node<Data>,
): Node<Data> {
  if (path.length === 0) {
    return fn(node);
  }
  return {
    ...node,
    children: node.children.map((child) =>
      child.id === path[0] ? updateNode(child, path.slice(1), fn) : child,
    ),
  };
}

export function moveNodeUp<Data>(root: Node<Data>, path: string[]): Node<Data> {
  const parentPath = path.slice(0, -1);
  const id = path[path.length - 1];
  return updateNode(root, parentPath, (node) => {
    const { children } = node;
    const index = children.findIndex((child) => child.id === id);
    if (index === -1) {
      throw new Error();
    }
    if (index === 0) {
      return node;
    }
    return {
      ...node,
      children: children
        .slice(0, index - 1)
        .concat(children[index])
        .concat(children[index - 1])
        .concat(children.slice(index + 1)),
    };
  });
}

export function moveNodeDown<Data>(root: Node<Data>, path: string[]): Node<Data> {
  const parentPath = path.slice(0, -1);
  const id = path[path.length - 1];
  return updateNode(root, parentPath, (node) => {
    const { children } = node;
    const index = children.findIndex((child) => child.id === id);
    if (index === -1 || index === children.length - 1) {
      throw new Error();
    }
    return {
      ...node,
      children: children
        .slice(0, index)
        .concat(children[index + 1])
        .concat(children[index])
        .concat(children.slice(index + 2)),
    };
  });
}
