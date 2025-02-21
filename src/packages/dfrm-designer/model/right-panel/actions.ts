export type RightPanelAction =
  | RightPanelResetAction
  | RightPanelToggleAction
  | RightPanelResizeAction;

export interface RightPanelResetAction {
  type: "right-panel__reset";
}

export interface RightPanelToggleAction {
  type: "right-panel__toggle";
}

export interface RightPanelResizeAction {
  type: "right-panel__resize";
  payload: { width: number };
}
