import React from "react";
import { ExplorerTreeLeafNode } from "../../../components/ExplorerTree";
import {
  type SchemaTreeComponentNodeData,
  type SchemaTreeNodeData,
  useIntlState,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import { useComponentMap } from "../../inspector";
import { joinLabel, usePath } from "../../schema-tree";
import { useDndProps } from "../hooks/useDndProps";
import { useLeafProps } from "../hooks/useLeafProps";
import { JumpToComponentButton } from "./JumpToComponentButton";
import { JumpToComponentMenuItem } from "./JumpToComponentMenuItem";

interface ComponentNodeRendererProps {
  level: number;
  parentPath: string[];
  node: Node<SchemaTreeComponentNodeData, SchemaTreeNodeData>;
  label?: string;
}

export const ComponentNodeRenderer: React.FunctionComponent<ComponentNodeRendererProps> =
  React.memo(({ level, parentPath, node, label = "" }) => {
    const { locale } = useIntlState();

    const componentMap = useComponentMap();
    const componentNode = React.useMemo(
      () => componentMap[node.data.component],
      [componentMap, node],
    );

    const path = usePath(parentPath, node);
    const dndProps = useDndProps(path);
    const leafProps = useLeafProps(path, node);

    return (
      <ExplorerTreeLeafNode
        {...dndProps}
        {...leafProps}
        level={level}
        actions={<JumpToComponentButton node={node} />}
        menu={<JumpToComponentMenuItem node={node} />}
        label={joinLabel(
          label,
          joinLabel(node.data.type, componentNode.data.label[locale] || "anonymous"),
        )}
      />
    );
  });
