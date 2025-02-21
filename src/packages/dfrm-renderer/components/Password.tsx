import React from "react";
import { Password } from "../../dfrm-components";
import type { RenderPasswordResult } from "../../dfrm-schema";

interface PasswordRendererProps<Meta> extends RenderPasswordResult<Meta> {
  onBlur(): unknown;
  onChangeValue(value: unknown): unknown;
}

export const PasswordRenderer = React.memo(function PasswordRenderer<Meta>({
  name,
  value,
  onBlur,
  onChangeValue,
}: PasswordRendererProps<Meta>): React.ReactElement {
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
    <Password
      name={name}
      value={value === undefined || value === null ? "" : `${value}`}
      onBlur={onBlur}
      onChangeValue={onChangeValueInner}
    />
  );
});
