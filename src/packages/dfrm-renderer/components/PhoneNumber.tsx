import { PhoneNumber } from "dfrm-components";
import type { RenderPhoneNumberResult } from "dfrm-schema";
import React from "react";

interface PhoneNumberRendererProps<Meta> extends RenderPhoneNumberResult<Meta> {
  onBlur(): unknown;
  onChangeValue(value: unknown): unknown;
}

export const PhoneNumberRenderer = React.memo(function PhoneNumberRenderer<Meta>({
  searchMessage,
  noOptionsMessage,
  name,
  value,
  onBlur,
  onChangeValue,
}: PhoneNumberRendererProps<Meta>): React.ReactElement {
  const onChangeValueInner = React.useCallback(
    (value: string) => {
      if (value === "") {
        onChangeValue(null);
      } else {
        onChangeValue(value);
      }
    },
    [onChangeValue],
  );
  return (
    <PhoneNumber
      searchMessage={searchMessage}
      noOptionsMessage={noOptionsMessage}
      name={name}
      locale="en"
      value={value === undefined || value === null ? "" : `${value}`}
      onBlur={onBlur}
      onChangeValue={onChangeValueInner}
    />
  );
});
