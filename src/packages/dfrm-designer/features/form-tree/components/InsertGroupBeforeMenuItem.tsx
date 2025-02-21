import React from "react";
import { CgInsertBefore } from "react-icons/cg";
import { MenuItem } from "../../../components/ContextMenu";
import { useDispatch } from "../../../model";
import { createParentNode } from "../utils/createParentNode";

interface InsertGroupBeforeMenuItemProps {
  path: string[];
}

export const InsertGroupBeforeMenuItem: React.FunctionComponent<InsertGroupBeforeMenuItemProps> =
  React.memo(({ path }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      const node = createParentNode();
      dispatch({
        type: "form-tree__insert-before",
        payload: { path, node },
      });
      dispatch({
        type: "form-tree__select",
        payload: { path: path.slice(0, -1).concat(node.id) },
      });
    }, [dispatch, path]);
    return <MenuItem icon={<CgInsertBefore />} text="Insert group before" onClick={onClick} />;
  });
