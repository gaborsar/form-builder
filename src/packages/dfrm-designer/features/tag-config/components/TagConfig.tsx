import React from "react";
import {
  type TagTreeLeafNodeData,
  type TagTreeNodeData,
  type TagTreeParentNodeData,
  useTagTreeState,
} from "../../../model";
import { type Node, findNodeByPath } from "../../../utils/tree";
import { LeafConfig } from "./LeafConfig";
import { ParentConfig } from "./ParentConfig";

interface TagConfigProps {
  path: string[];
}

export const TagConfig: React.FunctionComponent<TagConfigProps> = React.memo(({ path }) => {
  const { root } = useTagTreeState();

  const node = React.useMemo(() => findNodeByPath(root, path), [root, path]);

  if (path.length === 0) {
    return null;
  }

  return node.data.type === "Parent" ? (
    <ParentConfig path={path} node={node as Node<TagTreeParentNodeData, TagTreeNodeData>} />
  ) : (
    <LeafConfig path={path} node={node as Node<TagTreeLeafNodeData, TagTreeNodeData>} />
  );
});
