import React from "react";
import { CgMoveDown } from "react-icons/cg";
import { MenuItem } from "../../../components/ContextMenu";
import { useDispatch } from "../../../model";

interface MoveDownMenuItemProps {
  path: string[];
}

export const MoveDownMenuItem: React.FunctionComponent<MoveDownMenuItemProps> = React.memo(
  ({ path }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      dispatch({
        type: "form-schema-tree__move-down",
        payload: { path },
      });
      dispatch({
        type: "form-schema-tree__select",
        payload: { path },
      });
    }, [dispatch, path]);
    return <MenuItem icon={<CgMoveDown />} text="Move down" onClick={onClick} />;
  },
);
