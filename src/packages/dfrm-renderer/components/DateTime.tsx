import React from "react";
import { DateTime } from "../../dfrm-components";
import type { RenderDateTimeResult } from "../../dfrm-schema";

interface DateTimeRendererProps<Meta> extends RenderDateTimeResult<Meta> {
  onBlur(): unknown;
  onChangeValue(value: unknown): unknown;
}

export const DateTimeRenderer = React.memo(function DateTimeRenderer<Meta>({
  nowMessage,
  name,
  value,
  onBlur,
  onChangeValue,
}: DateTimeRendererProps<Meta>): React.ReactElement {
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
    <DateTime
      nowMessage={nowMessage}
      name={name}
      value={value === undefined || value === null ? "" : `${value}`}
      onBlur={onBlur}
      onChangeValue={onChangeValueInner}
    />
  );
});
