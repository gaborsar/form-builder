export interface MessageMap {
  append?: LocalizedMessageMap;
  select?: LocalizedMessageMap;
  search?: LocalizedMessageMap;
  now?: LocalizedMessageMap;
  noOptions?: LocalizedMessageMap;
}

export interface ErrorMessageMap {
  InvalidType?: LocalizedMessageMap;
  InvalidItemType?: LocalizedMessageMap;
  InvalidFormat?: LocalizedMessageMap;
  InvalidValue?: LocalizedMessageMap;
  Required?: LocalizedMessageMap;
  MinLength?: LocalizedMessageMap;
  MaxLength?: LocalizedMessageMap;
  Unique?: LocalizedMessageMap;
  UnknownKey?: LocalizedMessageMap;
  Pattern?: LocalizedMessageMap;
  Precision?: LocalizedMessageMap;
  MultipleOf?: LocalizedMessageMap;
  Min?: LocalizedMessageMap;
  Max?: LocalizedMessageMap;
  MinExclusive?: LocalizedMessageMap;
  MaxExclusive?: LocalizedMessageMap;
}

export interface LocalizedMessageMap {
  [locale: string]: string;
}

export interface UnknownValueMap {
  [key: string]: unknown;
}

export function localizeMessage(
  descriptor: LocalizedMessageMap,
  locale: string,
  values: UnknownValueMap = {},
): string {
  let { [locale]: result = "" } = descriptor;
  for (const [key, value] of Object.entries(values)) {
    result = result.replace(`{${key}}`, `${value}`);
  }
  return result;
}
