import React from "react";
import { VscTrash } from "react-icons/vsc";
import { ConfirmMenuItem } from "../../../components/ContextMenu";
import { type TagTreeNodeData, useDispatch } from "../../../model";
import type { Node } from "../../../utils/tree";
import { getAllTagIds } from "../utils/getAllTagIds";

interface RemoveMenuItemProps {
  path: string[];
  node: Node<TagTreeNodeData>;
}

export const RemoveMenuItem: React.FunctionComponent<RemoveMenuItemProps> = React.memo(
  ({ path, node }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      const ids = getAllTagIds(node);
      dispatch({
        type: "tag-tree__remove-tag-references",
        payload: { ids },
      });
      dispatch({
        type: "form-tree__remove-tag-references",
        payload: { ids },
      });
      dispatch({
        type: "tag-tree__select",
        payload: { path: path.slice(0, -1) },
      });
      dispatch({
        type: "tag-tree__remove",
        payload: { path },
      });
      dispatch({
        type: "editor__close-tab",
        payload: { path },
      });
    }, [dispatch, path, node]);
    return <ConfirmMenuItem icon={<VscTrash />} text="Remove" onClick={onClick} />;
  },
);
