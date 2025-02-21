import React from "react";
import { Input } from "../../dfrm-components";
import type { RenderShortTextResult } from "../../dfrm-schema";

interface ShortTextRendererProps<Meta> extends RenderShortTextResult<Meta> {
  onBlur(): unknown;
  onChangeValue(value: unknown): unknown;
}

export const ShortTextRenderer = React.memo(function ShortTextRenderer<Meta>({
  name,
  value,
  onBlur,
  onChangeValue,
}: ShortTextRendererProps<Meta>): React.ReactElement {
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
      type="text"
      name={name}
      value={value === undefined || value === null ? "" : `${value}`}
      onBlur={onBlur}
      onChangeValue={onChangeValueInner}
    />
  );
});
