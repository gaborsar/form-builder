import React from "react";
import { CgInsertAfter } from "react-icons/cg";
import { MenuItem } from "../../../components/ContextMenu";
import { useDispatch } from "../../../model";
import { createFieldsetNode } from "../../schema-tree";

interface InsertFieldsetAfterMenuItemProps {
  path: string[];
}

export const InsertFieldsetAfterMenuItem: React.FunctionComponent<InsertFieldsetAfterMenuItemProps> =
  React.memo(({ path }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      const node = createFieldsetNode();
      dispatch({
        type: "form-schema-tree__insert-after",
        payload: { path, node },
      });
      dispatch({
        type: "form-schema-tree__select",
        payload: { path: path.slice(0, -1).concat(node.id) },
      });
    }, [dispatch, path]);
    return <MenuItem icon={<CgInsertAfter />} text="Insert fieldset after" onClick={onClick} />;
  });
