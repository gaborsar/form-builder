export type LeftPanelAction = LeftPanelResetAction | LeftPanelToggleAction | LeftPanelResizeAction;

export interface LeftPanelResetAction {
  type: "left-panel__reset";
}

export interface LeftPanelToggleAction {
  type: "left-panel__toggle";
}

export interface LeftPanelResizeAction {
  type: "left-panel__resize";
  payload: { width: number };
}
