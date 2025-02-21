import React from "react";
import { VscCollapseAll, VscExpandAll } from "react-icons/vsc";
import { ExplorerButton } from "../../../components/Explorer";
import { useDispatch } from "../../../model";

export const ComponentSchemaTreeActions: React.FunctionComponent = React.memo(() => {
  const dispatch = useDispatch();

  const onExpandAll = React.useCallback(() => {
    dispatch({
      type: "component-schema-tree__expand-all",
    });
  }, [dispatch]);

  const onCollapseAll = React.useCallback(() => {
    dispatch({
      type: "component-schema-tree__collapse-all",
    });
  }, [dispatch]);

  return (
    <>
      <ExplorerButton title="Expand all" onClick={onExpandAll}>
        <VscExpandAll />
      </ExplorerButton>
      <ExplorerButton title="Collapse all" onClick={onCollapseAll}>
        <VscCollapseAll />
      </ExplorerButton>
    </>
  );
});
