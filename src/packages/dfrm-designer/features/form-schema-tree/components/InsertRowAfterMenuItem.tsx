import React from "react";
import { CgInsertAfter } from "react-icons/cg";
import { MenuItem } from "../../../components/ContextMenu";
import { useDispatch } from "../../../model";
import { createRowNode } from "../../schema-tree";

interface InsertRowAfterMenuItemProps {
  path: string[];
}

export const InsertRowAfterMenuItem: React.FunctionComponent<InsertRowAfterMenuItemProps> =
  React.memo(({ path }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      const node = createRowNode();
      dispatch({
        type: "form-schema-tree__insert-after",
        payload: { path, node },
      });
      dispatch({
        type: "form-schema-tree__select",
        payload: { path: path.slice(0, -1).concat(node.id) },
      });
    }, [dispatch, path]);
    return <MenuItem icon={<CgInsertAfter />} text="Insert row after" onClick={onClick} />;
  });
