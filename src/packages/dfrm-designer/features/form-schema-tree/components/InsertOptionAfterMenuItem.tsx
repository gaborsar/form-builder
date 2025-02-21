import React from "react";
import { CgInsertAfter } from "react-icons/cg";
import { MenuItem } from "../../../components/ContextMenu";
import { useDispatch } from "../../../model";
import { createOptionNode } from "../../schema-tree";

interface InsertOptionAfterMenuItemProps {
  path: string[];
}

export const InsertOptionAfterMenuItem: React.FunctionComponent<InsertOptionAfterMenuItemProps> =
  React.memo(({ path }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      const node = createOptionNode();
      dispatch({
        type: "form-schema-tree__insert-after",
        payload: { path, node },
      });
      dispatch({
        type: "form-schema-tree__select",
        payload: { path: path.slice(0, -1).concat(node.id) },
      });
    }, [dispatch, path]);
    return <MenuItem icon={<CgInsertAfter />} text="Insert option after" onClick={onClick} />;
  });
