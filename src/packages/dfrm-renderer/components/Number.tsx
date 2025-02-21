import React from "react";
import { NumberInput } from "../../dfrm-components";
import type { RenderNumberResult } from "../../dfrm-schema";

interface NumberRendererProps<Meta> extends RenderNumberResult<Meta> {
  onBlur(): unknown;
  onChangeValue(value: unknown): unknown;
}

export const NumberRenderer = React.memo(function NumberRenderer<Meta>({
  name,
  value,
  unit,
  onBlur,
  onChangeValue,
}: NumberRendererProps<Meta>): React.ReactElement {
  const onChangeValueInner = React.useCallback(
    (value: string) => {
      if (value === "") {
        onChangeValue(null);
      } else {
        onChangeValue(Number.parseFloat(value));
      }
    },
    [onChangeValue],
  );
  return (
    <NumberInput
      name={name}
      value={value === undefined || value === null ? "" : `${value}`}
      unit={unit}
      onBlur={onBlur}
      onChangeValue={onChangeValueInner}
    />
  );
});
