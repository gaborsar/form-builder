import type { LocalizedMessageMap } from "./IntlUtils";

export interface Option<Meta> {
  meta?: Meta;
  label: LocalizedMessageMap;
  value: string;
}

export interface RenderOptionResult<Meta> {
  meta?: Meta;
  label: string;
  value: string;
}
