import React from "react";
import { CgInsertBefore } from "react-icons/cg";
import { MenuItem } from "../../../components/ContextMenu";
import { useDispatch } from "../../../model";
import { createRowNode } from "../../schema-tree";

interface InsertRowBeforeMenuItemProps {
  path: string[];
}

export const InsertRowBeforeMenuItem: React.FunctionComponent<InsertRowBeforeMenuItemProps> =
  React.memo(({ path }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      const node = createRowNode();
      dispatch({
        type: "form-schema-tree__insert-before",
        payload: { path, node },
      });
      dispatch({
        type: "form-schema-tree__select",
        payload: { path: path.slice(0, -1).concat(node.id) },
      });
    }, [dispatch, path]);
    return <MenuItem icon={<CgInsertBefore />} text="Insert row before" onClick={onClick} />;
  });
