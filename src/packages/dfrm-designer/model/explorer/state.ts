export interface ExplorerState {
  tab: ExplorerTabId;
}

export enum ExplorerTabId {
  Tags = "tags",
  Forms = "forms",
  Components = "components",
  Structure = "structure",
}
