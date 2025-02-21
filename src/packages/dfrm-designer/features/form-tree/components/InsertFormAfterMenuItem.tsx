import React from "react";
import { CgInsertAfter } from "react-icons/cg";
import { MenuItem } from "../../../components/ContextMenu";
import { useDispatch } from "../../../model";
import { createLeafNode } from "../utils/createLeafNode";

interface InsertFormAfterMenuItemProps {
  path: string[];
}

export const InsertFormAfterMenuItem: React.FunctionComponent<InsertFormAfterMenuItemProps> =
  React.memo(({ path }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      const node = createLeafNode();
      dispatch({
        type: "form-tree__insert-after",
        payload: { path, node },
      });
      dispatch({
        type: "form-tree__select",
        payload: { path: path.slice(0, -1).concat(node.id) },
      });
    }, [dispatch, path]);
    return <MenuItem icon={<CgInsertAfter />} text="Insert form after" onClick={onClick} />;
  });
