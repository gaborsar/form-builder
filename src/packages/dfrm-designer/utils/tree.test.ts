jest.mock("nanoid", () => {
  return { nanoid: () => `${Math.random()}` };
});
import {
  type Node,
  appendNode,
  cloneNode,
  collapseAll,
  collapseNode,
  expandAll,
  expandNode,
  findNodeById,
  findNodeByPath,
  findPath,
  insertNodeAfter,
  insertNodeBefore,
  isSamePath,
  moveNodeDown,
  moveNodeUp,
  removeNode,
  replaceNode,
  resolvePath,
  toggleNode,
  updateNode,
} from "./tree";

const node: Node<void> = {
  id: "",
  visible: true,
  collapsible: true,
  collapsed: false,
  data: undefined,
  children: [],
};

describe("tree utils", () => {
  test("isSamePath", () => {
    expect(isSamePath(["a", "b"], ["a", "c"])).toBe(false);
    expect(isSamePath(["a", "b"], ["a", "b"])).toBe(true);
  });

  test("findPath", () => {
    const root = {
      ...node,
      id: "a",
      children: [{ ...node, id: "b", children: [{ ...node, id: "c" }] }],
    };
    expect(findPath(root, "c")).toEqual(["b", "c"]);
  });

  test("resolvePath", () => {
    const root = {
      ...node,
      id: "a",
      children: [{ ...node, id: "b", children: [{ ...node, id: "c" }] }],
    };
    expect(resolvePath(root, ["b", "c"])).toEqual([
      root,
      root.children[0],
      root.children[0].children[0],
    ]);
  });

  test("findNodeById", () => {
    const root = {
      ...node,
      id: "a",
      children: [{ ...node, id: "b", children: [{ ...node, id: "c" }] }],
    };
    expect(findNodeById(root, "c")).toEqual(root.children[0].children[0]);
  });

  test("findNodeByPath", () => {
    const root = {
      ...node,
      id: "a",
      children: [{ ...node, id: "b", children: [{ ...node, id: "c" }] }],
    };
    expect(findNodeByPath(root, ["b", "c"])).toEqual(root.children[0].children[0]);
  });

  test("cloneNode", () => {
    const root1: Node<string> = {
      ...node,
      id: "a",
      data: "a",
      children: [
        {
          ...node,
          id: "b",
          data: "b",
          children: [
            {
              ...node,
              id: "b",
              data: "c",
              children: [],
            },
          ],
        },
      ],
    };
    const root2 = cloneNode(root1);
    expect(root2).not.toEqual(root1);
    expect(removeIds(root2)).toEqual(removeIds(root1));
  });

  test("expandAll", () => {
    const root1 = {
      ...node,
      id: "a",
      collapsed: true,
      children: [
        {
          ...node,
          collapsed: true,
          id: "b",
          children: [
            {
              ...node,
              collapsible: false,
              collapsed: false,
              id: "c",
            },
          ],
        },
      ],
    };
    const root2 = {
      ...node,
      id: "a",
      collapsed: false,
      children: [
        {
          ...node,
          collapsed: false,
          id: "b",
          children: [
            {
              ...node,
              collapsible: false,
              collapsed: false,
              id: "c",
            },
          ],
        },
      ],
    };
    expect(expandAll(root1)).toEqual(root2);
  });

  test("collapseAll", () => {
    const root1 = {
      ...node,
      id: "a",
      collapsed: false,
      children: [
        {
          ...node,
          collapsed: false,
          id: "b",
          children: [
            {
              ...node,
              collapsible: false,
              collapsed: false,
              id: "c",
            },
          ],
        },
      ],
    };
    const root2 = {
      ...node,
      id: "a",
      collapsed: true,
      children: [
        {
          ...node,
          collapsed: true,
          id: "b",
          children: [
            {
              ...node,
              collapsible: false,
              collapsed: false,
              id: "c",
            },
          ],
        },
      ],
    };
    expect(collapseAll(root1)).toEqual(root2);
  });

  test("expandNode", () => {
    const root1 = {
      ...node,
      id: "a",
      collapsed: false,
      children: [
        {
          ...node,
          collapsed: true,
          id: "b",
          children: [
            {
              ...node,
              collapsible: false,
              collapsed: false,
              id: "c",
            },
          ],
        },
      ],
    };
    const root2 = {
      ...node,
      id: "a",
      collapsed: false,
      children: [
        {
          ...node,
          collapsed: false,
          id: "b",
          children: [
            {
              ...node,
              collapsible: false,
              collapsed: false,
              id: "c",
            },
          ],
        },
      ],
    };
    expect(expandNode(root1, ["b"])).toEqual(root2);
  });

  test("collapseNode", () => {
    const root1 = {
      ...node,
      id: "a",
      collapsed: false,
      children: [
        {
          ...node,
          collapsed: false,
          id: "b",
          children: [
            {
              ...node,
              collapsible: false,
              collapsed: false,
              id: "c",
            },
          ],
        },
      ],
    };
    const root2 = {
      ...node,
      id: "a",
      collapsed: false,
      children: [
        {
          ...node,
          collapsed: true,
          id: "b",
          children: [
            {
              ...node,
              collapsible: false,
              collapsed: false,
              id: "c",
            },
          ],
        },
      ],
    };
    expect(collapseNode(root1, ["b"])).toEqual(root2);
    expect(collapseNode(root1, ["b", "c"])).toEqual(root1);
  });

  test("toggleNode", () => {
    const root1 = {
      ...node,
      id: "a",
      collapsed: false,
      children: [
        {
          ...node,
          collapsed: false,
          id: "b",
          children: [
            {
              ...node,
              collapsible: false,
              collapsed: false,
              id: "c",
            },
          ],
        },
      ],
    };
    const root2 = {
      ...node,
      id: "a",
      collapsed: false,
      children: [
        {
          ...node,
          collapsed: true,
          id: "b",
          children: [
            {
              ...node,
              collapsible: false,
              collapsed: false,
              id: "c",
            },
          ],
        },
      ],
    };
    expect(toggleNode(root1, ["b"])).toEqual(root2);
    expect(toggleNode(toggleNode(root1, ["b"]), ["b"])).toEqual(root1);
    expect(toggleNode(root1, ["b", "c"])).toEqual(root1);
  });

  test("appendNode", () => {
    const root1 = { ...node, id: "a", children: [{ ...node, id: "b" }] };
    const root2 = {
      ...node,
      id: "a",
      children: [{ ...node, id: "b", children: [{ ...node, id: "c" }] }],
    };
    expect(appendNode(root1, ["b"], { ...node, id: "c" })).toEqual(root2);
  });

  test("insertNodeBefore", () => {
    const root1 = {
      ...node,
      id: "a",
      children: [{ ...node, id: "b", children: [{ ...node, id: "c" }] }],
    };
    const root2 = {
      ...node,
      id: "a",
      children: [
        {
          ...node,
          id: "b",
          children: [
            { ...node, id: "d" },
            { ...node, id: "c" },
          ],
        },
      ],
    };
    expect(insertNodeBefore(root1, ["b", "c"], { ...node, id: "d" })).toEqual(root2);
  });

  test("insertNodeAfter", () => {
    const root1 = {
      ...node,
      id: "a",
      children: [{ ...node, id: "b", children: [{ ...node, id: "c" }] }],
    };
    const root2 = {
      ...node,
      id: "a",
      children: [
        {
          ...node,
          id: "b",
          children: [
            { ...node, id: "c" },
            { ...node, id: "d" },
          ],
        },
      ],
    };
    expect(insertNodeAfter(root1, ["b", "c"], { ...node, id: "d" })).toEqual(root2);
  });

  test("removeNode", () => {
    const root1 = {
      ...node,
      id: "a",
      children: [{ ...node, id: "b", children: [{ ...node, id: "c" }] }],
    };
    const root2 = { ...node, id: "a", children: [{ ...node, id: "b" }] };
    expect(removeNode(root1, ["b", "c"])).toEqual(root2);
  });

  test("replaceNode", () => {
    const root1 = {
      ...node,
      id: "a",
      children: [{ ...node, id: "b", children: [{ ...node, id: "c" }] }],
    };
    const root2 = {
      ...node,
      id: "a",
      children: [{ ...node, id: "b", children: [{ ...node, id: "d" }] }],
    };
    expect(replaceNode(root1, ["b", "c"], { ...node, id: "d" })).toEqual(root2);
  });

  test("updateNode", () => {
    const root1 = {
      ...node,
      id: "a",
      children: [{ ...node, id: "b", children: [{ ...node, id: "c" }] }],
    };
    const root2 = {
      ...node,
      id: "a",
      children: [{ ...node, id: "b", children: [{ ...node, id: "d" }] }],
    };
    expect(updateNode(root1, ["b", "c"], (node) => ({ ...node, id: "d" }))).toEqual(root2);
  });

  test("moveNodeUp", () => {
    const root1 = {
      ...node,
      id: "a",
      children: [
        {
          ...node,
          id: "b",
          children: [
            { ...node, id: "d" },
            { ...node, id: "c" },
          ],
        },
      ],
    };
    const root2 = {
      ...node,
      id: "a",
      children: [
        {
          ...node,
          id: "b",
          children: [
            { ...node, id: "c" },
            { ...node, id: "d" },
          ],
        },
      ],
    };
    expect(moveNodeUp(root1, ["b", "c"])).toEqual(root2);
  });

  test("moveNodeDown", () => {
    const root1 = {
      ...node,
      id: "a",
      children: [
        {
          ...node,
          id: "b",
          children: [
            { ...node, id: "c" },
            { ...node, id: "d" },
          ],
        },
      ],
    };
    const root2 = {
      ...node,
      id: "a",
      children: [
        {
          ...node,
          id: "b",
          children: [
            { ...node, id: "d" },
            { ...node, id: "c" },
          ],
        },
      ],
    };
    expect(moveNodeDown(root1, ["b", "c"])).toEqual(root2);
  });
});

function removeIds<Data>(node: Node<Data>): Node<Data> {
  return {
    ...node,
    id: "",
    children: node.children.map(removeIds),
  };
}
