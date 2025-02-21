import React from "react";
import { VscArrowRight } from "react-icons/vsc";
import { MenuItem } from "../../../components/ContextMenu";
import {
  EditorTabType,
  type SchemaTreeComponentNodeData,
  type SchemaTreeNodeData,
  useComponentTreeState,
  useDispatch,
} from "../../../model";
import { type Node, findPath } from "../../../utils/tree";

interface JumpToComponentMenuItemProps {
  node: Node<SchemaTreeComponentNodeData, SchemaTreeNodeData>;
}

export const JumpToComponentMenuItem: React.FunctionComponent<JumpToComponentMenuItemProps> =
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
    return <MenuItem icon={<VscArrowRight />} text="Jump to component" onClick={onClick} />;
  });
