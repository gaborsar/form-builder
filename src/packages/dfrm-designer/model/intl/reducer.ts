import type { IntlAction } from "./actions";
import type { IntlState } from "./state";

export function intlReducer(state: IntlState, action: IntlAction): IntlState {
  if (action.type === "intl__select-locale") {
    return { ...state, locale: action.payload.locale };
  }
  return state;
}
