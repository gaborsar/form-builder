import React from "react";
import {
  Toolbox,
  ToolboxContext,
  ToolboxTab,
  ToolboxTabContent,
} from "../../../components/Toolbox";
import { ToolboxTabId, useToolboxState } from "../../../model";
import { useDispatch } from "../../../model";
import { FlatResultRenderer } from "./FlatResultRenderer";
import { OptimiziedValueRenderer } from "./OptimizedValueRenderer";
import { ReferencesRenderer } from "./ReferencesRenderer";

export const ToolboxRenderer: React.FunctionComponent = React.memo(() => {
  const { tab } = useToolboxState();
  const dispatch = useDispatch();
  const setTab = React.useCallback(
    (tab: ToolboxTabId) => {
      dispatch({ type: "toolbox__set-tab", payload: { tab } });
    },
    [dispatch],
  );
  return (
    <ToolboxContext.Provider value={{ tab, setTab }}>
      <Toolbox
        tabs={
          <>
            <ToolboxTab value={ToolboxTabId.References}>References</ToolboxTab>
            <ToolboxTab value={ToolboxTabId.Problems}>Problems</ToolboxTab>
            <ToolboxTab value={ToolboxTabId.Result}>Result</ToolboxTab>
            <ToolboxTab value={ToolboxTabId.Value}>Value</ToolboxTab>
          </>
        }
        body={
          <>
            <ToolboxTabContent value={ToolboxTabId.References}>
              <ReferencesRenderer />
            </ToolboxTabContent>
            <ToolboxTabContent value={ToolboxTabId.Result}>
              <FlatResultRenderer />
            </ToolboxTabContent>
            <ToolboxTabContent value={ToolboxTabId.Value}>
              <OptimiziedValueRenderer />
            </ToolboxTabContent>
          </>
        }
      />
    </ToolboxContext.Provider>
  );
});
