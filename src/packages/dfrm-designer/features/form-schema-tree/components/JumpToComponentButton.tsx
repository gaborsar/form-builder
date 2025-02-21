import React from "react";
import { VscArrowRight } from "react-icons/vsc";
import { ExplorerNodeButton } from "../../../components/ExplorerTree";
import {
  EditorTabType,
  type SchemaTreeComponentNodeData,
  type SchemaTreeNodeData,
  useComponentTreeState,
  useDispatch,
} from "../../../model";
import { type Node, findPath } from "../../../utils/tree";

interface JumpToComponentButtonProps {
  node: Node<SchemaTreeComponentNodeData, SchemaTreeNodeData>;
}

export const JumpToComponentButton: React.FunctionComponent<JumpToComponentButtonProps> =
  React.memo(({ node }) => {
    const { root: componentTreeRoot } = useComponentTreeState();
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      const path = findPath(componentTreeRoot, node.data.component);
      dispatch({
        type: "editor__open-tab",
        payload: { type: EditorTabType.Component, path },
      });
    }, [dispatch, componentTreeRoot, node]);
    return (
      <ExplorerNodeButton title="Jump to component" onClick={onClick}>
        <VscArrowRight />
      </ExplorerNodeButton>
    );
  });
