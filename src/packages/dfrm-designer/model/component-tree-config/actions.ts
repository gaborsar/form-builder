import type { ComponentTreeConfigTabId } from "./state";

export type ComponentTreeConfigAction = ComponentTreeConfigSetTabAction;

export interface ComponentTreeConfigSetTabAction {
  type: "component-tree-config__set-tab";
  payload: { tab: ComponentTreeConfigTabId };
}
