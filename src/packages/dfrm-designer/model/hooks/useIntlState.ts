import { useSelector } from "react-redux";
import type { IntlState } from "../intl";
import type { State } from "../root";

export function useIntlState(): IntlState {
  return useSelector(selectIntlState);
}

function selectIntlState({ intl }: State): IntlState {
  return intl;
}
