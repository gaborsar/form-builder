import React from "react";
import { VscArrowRight } from "react-icons/vsc";
import { ExplorerNodeButton } from "../../../components/ExplorerTree";
import { EditorTabType, ExplorerTabId, useDispatch } from "../../../model";

interface OpenButtonProps {
  path: string[];
}

export const OpenButton: React.FunctionComponent<OpenButtonProps> = React.memo(({ path }) => {
  const dispatch = useDispatch();
  const onClick = React.useCallback(() => {
    dispatch({
      type: "component-tree__select",
      payload: { path },
    });
    dispatch({
      type: "editor__open-tab",
      payload: { type: EditorTabType.Component, path },
    });
    dispatch({
      type: "explorer__set-tab",
      payload: { tab: ExplorerTabId.Structure },
    });
  }, [dispatch, path]);
  return (
    <ExplorerNodeButton title="Open" onClick={onClick}>
      <VscArrowRight />
    </ExplorerNodeButton>
  );
});
