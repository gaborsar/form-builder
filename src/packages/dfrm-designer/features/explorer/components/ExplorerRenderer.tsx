import React from "react";
import { Explorer, ExplorerContext } from "../../../components/Explorer";
import { type ExplorerTabId, useDispatch } from "../../../model";
import { useExplorerState } from "../../../model/hooks/useExplorerState";
import { Actions } from "./Actions";
import { Content } from "./Content";
import { Search } from "./Search";
import { Tabs } from "./Tabs";

export const ExplorerRenderer: React.FunctionComponent = React.memo(() => {
  const { tab } = useExplorerState();
  const dispatch = useDispatch();
  const setTab = React.useCallback(
    (tab: ExplorerTabId) => {
      dispatch({ type: "explorer__set-tab", payload: { tab } });
    },
    [dispatch],
  );
  return (
    <ExplorerContext.Provider value={{ tab, setTab }}>
      <Explorer tabs={<Tabs />} actions={<Actions />} search={<Search />} content={<Content />} />
    </ExplorerContext.Provider>
  );
});
