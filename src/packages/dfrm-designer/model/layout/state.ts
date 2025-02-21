export interface LayoutState {
  activeElement: LayoutElementId;
}

export enum LayoutElementId {
  LeftPanel = "left-panel",
  RightPanel = "right-panel",
  BottomPanel = "bottom-panel",
  Editor = "editor",
}
