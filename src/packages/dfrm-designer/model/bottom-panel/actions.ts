export type BottomPanelAction =
  | BottomPanelResetAction
  | BottomPanelToggleAction
  | BottomPanelResizeAction;

export interface BottomPanelResetAction {
  type: "bottom-panel__reset";
}

export interface BottomPanelToggleAction {
  type: "bottom-panel__toggle";
}

export interface BottomPanelResizeAction {
  type: "bottom-panel__resize";
  payload: { height: number };
}
