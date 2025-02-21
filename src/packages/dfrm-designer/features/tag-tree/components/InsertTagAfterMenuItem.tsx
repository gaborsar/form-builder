import React from "react";
import { CgInsertAfter } from "react-icons/cg";
import { MenuItem } from "../../../components/ContextMenu";
import { useDispatch } from "../../../model";
import { createLeafNode } from "../utils/createLeafNode";

interface InsertTagAfterMenuItemProps {
  path: string[];
}

export const InsertTagAfterMenuItem: React.FunctionComponent<InsertTagAfterMenuItemProps> =
  React.memo(({ path }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      const node = createLeafNode();
      dispatch({
        type: "tag-tree__insert-after",
        payload: { path, node },
      });
      dispatch({
        type: "tag-tree__select",
        payload: { path: path.slice(0, -1).concat(node.id) },
      });
    }, [dispatch, path]);
    return <MenuItem icon={<CgInsertAfter />} text="Insert tag after" onClick={onClick} />;
  });
