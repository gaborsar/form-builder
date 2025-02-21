import type { ExplorerTabId } from "./state";

export type ExplorerAction = ExplorerSetTabAction;

export interface ExplorerSetTabAction {
  type: "explorer__set-tab";
  payload: { tab: ExplorerTabId };
}
