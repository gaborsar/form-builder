import React from "react";
import { ExplorerTreeLeafNode } from "../../../components/ExplorerTree";
import type { SchemaTreeNodeData, SchemaTreeRemoteDropdownNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { useDndProps } from "../hooks/useDndProps";
import { useLeafProps } from "../hooks/useLeafProps";

const path: string[] = [];

interface RemoteDropdownNodeRendererProps {
  node: Node<SchemaTreeRemoteDropdownNodeData, SchemaTreeNodeData>;
}

export const RemoteDropdownNodeRenderer: React.FunctionComponent<RemoteDropdownNodeRendererProps> =
  React.memo(({ node }) => {
    const dndProps = useDndProps(path);
    const leafProps = useLeafProps(path, node);
    return <ExplorerTreeLeafNode {...dndProps} {...leafProps} level={0} label={node.data.type} />;
  });
