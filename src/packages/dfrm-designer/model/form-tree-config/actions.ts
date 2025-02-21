import type { FormTreeConfigTabId } from "./state";

export type FormTreeConfigAction = FormTreeConfigSetTabAction;

export interface FormTreeConfigSetTabAction {
  type: "form-tree-config__set-tab";
  payload: { tab: FormTreeConfigTabId };
}
