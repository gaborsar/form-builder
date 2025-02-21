import { CheckboxGroup } from "dfrm-components";
import type { RenderCheckboxGroupResult } from "dfrm-schema";
import React from "react";

interface CheckboxGroupRendererProps<Meta> extends RenderCheckboxGroupResult<Meta> {
  onBlur(): unknown;
  onChangeValue(value: unknown): unknown;
}

export const CheckboxGroupRenderer = React.memo(function CheckboxGroupRenderer<Meta>({
  name,
  direction,
  columns,
  options,
  value,
  onBlur,
  onChangeValue,
}: CheckboxGroupRendererProps<Meta>): React.ReactElement {
  const onChangeValueInner = React.useCallback(
    (value: string[]) => {
      if (value.length === 0) {
        onChangeValue(null);
      } else {
        onChangeValue(value);
      }
    },
    [onChangeValue],
  );
  return (
    <CheckboxGroup
      name={name}
      direction={direction}
      columns={columns}
      options={options}
      value={value === undefined || value === null ? [] : (value as string[])}
      onBlur={onBlur}
      onChangeValue={onChangeValueInner}
    />
  );
});
