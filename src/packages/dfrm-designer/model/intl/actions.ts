import type { Locale } from "./state";

export type IntlAction = SelectLocaleAction;

export interface SelectLocaleAction {
  type: "intl__select-locale";
  payload: { locale: Locale };
}
