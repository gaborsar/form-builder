import React from "react";
import { CgInsertBefore } from "react-icons/cg";
import { MenuItem } from "../../../components/ContextMenu";
import { useDispatch } from "../../../model";
import { createLeafNode } from "../utils/createLeafNode";

interface InsertFormBeforeMenuItemProps {
  path: string[];
}

export const InsertFormBeforeMenuItem: React.FunctionComponent<InsertFormBeforeMenuItemProps> =
  React.memo(({ path }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      const node = createLeafNode();
      dispatch({
        type: "form-tree__insert-before",
        payload: { path, node },
      });
      dispatch({
        type: "form-tree__select",
        payload: { path: path.slice(0, -1).concat(node.id) },
      });
    }, [dispatch, path]);
    return <MenuItem icon={<CgInsertBefore />} text="Insert form before" onClick={onClick} />;
  });
