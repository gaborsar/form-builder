import React from "react";
import { Input } from "../../dfrm-components";
import type { RenderEmailResult } from "../../dfrm-schema";

interface EmailRendererProps<Meta> extends RenderEmailResult<Meta> {
  onBlur(): unknown;
  onChangeValue(value: unknown): unknown;
}

export const EmailRenderer = React.memo(function EmailRenderer<Meta>({
  name,
  value,
  onBlur,
  onChangeValue,
}: EmailRendererProps<Meta>): React.ReactElement {
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
      type="email"
      name={name}
      value={value === undefined || value === null ? "" : `${value}`}
      onBlur={onBlur}
      onChangeValue={onChangeValueInner}
    />
  );
});
