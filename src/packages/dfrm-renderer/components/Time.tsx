import { Input } from "dfrm-components";
import type { RenderTimeResult } from "dfrm-schema";
import React from "react";

interface TimeRendererProps<Meta> extends RenderTimeResult<Meta> {
  onBlur(): unknown;
  onChangeValue(value: unknown): unknown;
}

export const TimeRenderer = React.memo(function TimeRenderer<Meta>({
  name,
  value,
  onBlur,
  onChangeValue,
}: TimeRendererProps<Meta>): React.ReactElement {
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
    <Input
      type="time"
      name={name}
      value={value === undefined || value === null ? "" : `${value}`}
      onBlur={onBlur}
      onChangeValue={onChangeValueInner}
    />
  );
});
