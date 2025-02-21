export interface ToolboxState {
  tab: ToolboxTabId;
}

export enum ToolboxTabId {
  References = "references",
  Problems = "problems",
  Result = "result",
  Value = "value",
}
