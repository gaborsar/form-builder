import React from "react";
import { VscTrash } from "react-icons/vsc";
import { ConfirmMenuItem } from "../../../components/ContextMenu";
import { useDispatch } from "../../../model";

interface RemoveMenuItemProps {
  path: string[];
}

export const RemoveMenuItem: React.FunctionComponent<RemoveMenuItemProps> = React.memo(
  ({ path }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      dispatch({
        type: "form-schema-tree__select",
        payload: { path: path.slice(0, -1) },
      });
      dispatch({
        type: "form-schema-tree__remove",
        payload: { path },
      });
    }, [dispatch, path]);
    return <ConfirmMenuItem icon={<VscTrash />} text="Remove" onClick={onClick} />;
  },
);
