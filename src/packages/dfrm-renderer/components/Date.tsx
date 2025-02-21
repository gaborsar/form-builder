import React from "react";
import { Input } from "../../dfrm-components";
import type { RenderDateResult } from "../../dfrm-schema";

interface DateRendererProps<Meta> extends RenderDateResult<Meta> {
  onBlur(): unknown;
  onChangeValue(value: unknown): unknown;
}

export const DateRenderer = React.memo(function DateRenderer<Meta>({
  name,
  value,
  onBlur,
  onChangeValue,
}: DateRendererProps<Meta>): React.ReactElement {
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
      type="date"
      name={name}
      value={value === undefined || value === null ? "" : `${value}`}
      onBlur={onBlur}
      onChangeValue={onChangeValueInner}
    />
  );
});
