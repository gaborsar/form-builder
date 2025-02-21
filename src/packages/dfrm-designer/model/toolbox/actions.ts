import type { ToolboxTabId } from "./state";

export type ToolboxAction = ToolboxSetTabAction;

export interface ToolboxSetTabAction {
  type: "toolbox__set-tab";
  payload: { tab: ToolboxTabId };
}
