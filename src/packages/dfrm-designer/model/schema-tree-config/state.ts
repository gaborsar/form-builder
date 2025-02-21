export interface SchemaTreeConfigState {
  tab: SchemaTreeConfigTabId;
}

export enum SchemaTreeConfigTabId {
  Properties = "properties",
  IdAndTags = "id-and-tags",
}
