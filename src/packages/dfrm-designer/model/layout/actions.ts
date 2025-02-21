import type { LayoutElementId } from "./state";

export type LayoutAction = LayoutFocusOnElementAction;

export interface LayoutFocusOnElementAction {
  type: "layout__focus-on-element";
  payload: { id: LayoutElementId };
}
