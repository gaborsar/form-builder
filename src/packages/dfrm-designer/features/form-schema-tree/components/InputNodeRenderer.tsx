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
import { joinLabel, usePath } from "../../schema-tree";
import { useDndProps } from "../hooks/useDndProps";
import { useLeafProps } from "../hooks/useLeafProps";

interface InputNodeRendererProps {
  level: number;
  parentPath: string[];
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
  label?: string;
}

export const InputNodeRenderer: React.FunctionComponent<InputNodeRendererProps> = React.memo(
  ({ level, parentPath, node, label = "" }) => {
    const path = usePath(parentPath, node);
    const dndProps = useDndProps(path);
    const leafProps = useLeafProps(path, node);
    return (
      <ExplorerTreeLeafNode
        {...dndProps}
        {...leafProps}
        level={level}
        label={joinLabel(label, node.data.type)}
      />
    );
  },
);
