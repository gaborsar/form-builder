import { RadioGroup } from "dfrm-components";
import type { RenderRadioGroupResult } from "dfrm-schema";
import React from "react";

interface RadioGroupRendererProps<Meta> extends RenderRadioGroupResult<Meta> {
  onBlur(): unknown;
  onChangeValue(value: unknown): unknown;
}

export const RadioGroupRenderer = React.memo(function RadioGroupRenderer<Meta>({
  name,
  direction,
  columns,
  options,
  value,
  onBlur,
  onChangeValue,
}: RadioGroupRendererProps<Meta>): React.ReactElement {
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
    <RadioGroup
      name={name}
      direction={direction}
      columns={columns}
      options={options}
      value={value === undefined || value === null ? "" : `${value}`}
      onBlur={onBlur}
      onChangeValue={onChangeValueInner}
    />
  );
});
