import React from "react";
import { ExplorerTreeLeafNode } from "../../../components/ExplorerTree";
import type {
  SchemaTreeDateNodeData,
  SchemaTreeDateTimeNodeData,
  SchemaTreeEmailNodeData,
  SchemaTreeLongTextNodeData,
  SchemaTreeNodeData,
  SchemaTreeNumberNodeData,
  SchemaTreePasswordNodeData,
  SchemaTreePhoneNumberNodeData,
  SchemaTreeShortTextNodeData,
  SchemaTreeTimeNodeData,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import { useDndProps } from "../hooks/useDndProps";
import { useLeafProps } from "../hooks/useLeafProps";

const path: string[] = [];

interface InputNodeRendererProps {
  node: Node<
    | SchemaTreeShortTextNodeData
    | SchemaTreeLongTextNodeData
    | SchemaTreeNumberNodeData
    | SchemaTreeDateNodeData
    | SchemaTreeTimeNodeData
    | SchemaTreeDateTimeNodeData
    | SchemaTreeEmailNodeData
    | SchemaTreePhoneNumberNodeData
    | SchemaTreePasswordNodeData,
    SchemaTreeNodeData
  >;
}

export const InputNodeRenderer: React.FunctionComponent<InputNodeRendererProps> = React.memo(
  ({ node }) => {
    const dndProps = useDndProps(path);
    const leafProps = useLeafProps(path, node);
    return <ExplorerTreeLeafNode {...dndProps} {...leafProps} level={0} label={node.data.type} />;
  },
);
