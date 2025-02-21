import React from "react";
import { CgInsertAfter } from "react-icons/cg";
import { MenuItem } from "../../../components/ContextMenu";
import { useDispatch } from "../../../model";
import { createParentNode } from "../utils/createParentNode";

interface InsertGroupAfterMenuItemProps {
  path: string[];
}

export const InsertGroupAfterMenuItem: React.FunctionComponent<InsertGroupAfterMenuItemProps> =
  React.memo(({ path }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      const node = createParentNode();
      dispatch({
        type: "tag-tree__insert-after",
        payload: { path, node },
      });
      dispatch({
        type: "tag-tree__select",
        payload: { path: path.slice(0, -1).concat(node.id) },
      });
    }, [dispatch, path]);
    return <MenuItem icon={<CgInsertAfter />} text="Insert group after" onClick={onClick} />;
  });
