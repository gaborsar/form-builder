import React from "react";
import { CgInsertBefore } from "react-icons/cg";
import { MenuItem } from "../../../components/ContextMenu";
import { useDispatch } from "../../../model";
import { createLeafNode } from "../utils/createLeafNode";

interface InsertComponentBeforeMenuItemProps {
  path: string[];
}

export const InsertComponentBeforeMenuItem: React.FunctionComponent<InsertComponentBeforeMenuItemProps> =
  React.memo(({ path }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      const node = createLeafNode();
      dispatch({
        type: "component-tree__insert-before",
        payload: { path, node },
      });
      dispatch({
        type: "component-tree__select",
        payload: { path: path.slice(0, -1).concat(node.id) },
      });
    }, [dispatch, path]);
    return <MenuItem icon={<CgInsertBefore />} text="Insert component before" onClick={onClick} />;
  });
