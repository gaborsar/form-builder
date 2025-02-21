import React from "react";
import { LongText } from "../../dfrm-components";
import type { RenderLongTextResult } from "../../dfrm-schema";

interface LongTextRendererProps<Meta> extends RenderLongTextResult<Meta> {
  onBlur(): unknown;
  onChangeValue(value: unknown): unknown;
}

export const LongTextRenderer = React.memo(function LongTextRenderer<Meta>({
  name,
  value,
  onBlur,
  onChangeValue,
}: LongTextRendererProps<Meta>): React.ReactElement {
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
    <LongText
      name={name}
      value={value === undefined || value === null ? "" : `${value}`}
      onBlur={onBlur}
      onChangeValue={onChangeValueInner}
    />
  );
});
