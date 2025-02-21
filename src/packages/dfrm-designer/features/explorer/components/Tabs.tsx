import React from "react";
import { ExplorerTab } from "../../../components/Explorer";
import { ExplorerTabId } from "../../../model";

export const Tabs: React.FunctionComponent = React.memo(() => (
  <>
    <ExplorerTab value={ExplorerTabId.Tags}>Tags</ExplorerTab>
    <ExplorerTab value={ExplorerTabId.Forms}>Forms</ExplorerTab>
    <ExplorerTab value={ExplorerTabId.Components}>Components</ExplorerTab>
    <ExplorerTab value={ExplorerTabId.Structure}>Structure</ExplorerTab>
  </>
));
