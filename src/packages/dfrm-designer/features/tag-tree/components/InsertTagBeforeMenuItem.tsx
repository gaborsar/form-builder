import React from "react";
import { CgInsertBefore } from "react-icons/cg";
import { MenuItem } from "../../../components/ContextMenu";
import { useDispatch } from "../../../model";
import { createLeafNode } from "../utils/createLeafNode";

interface InsertTagBeforeMenuItemProps {
  path: string[];
}

export const InsertTagBeforeMenuItem: React.FunctionComponent<InsertTagBeforeMenuItemProps> =
  React.memo(({ path }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      const node = createLeafNode();
      dispatch({
        type: "tag-tree__insert-before",
        payload: { path, node },
      });
      dispatch({
        type: "tag-tree__select",
        payload: { path: path.slice(0, -1).concat(node.id) },
      });
    }, [dispatch, path]);
    return <MenuItem icon={<CgInsertBefore />} text="Insert tag before" onClick={onClick} />;
  });
