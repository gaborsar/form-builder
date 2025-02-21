import React from "react";
import { Checkbox } from "../../dfrm-components";
import type { RenderCheckboxResult } from "../../dfrm-schema";

interface CheckboxRendererProps<Meta> extends RenderCheckboxResult<Meta> {
  onBlur(): unknown;
  onChangeValue(value: unknown): unknown;
}

export const CheckboxRenderer = React.memo(function CheckboxRenderer<Meta>({
  name,
  value,
  onBlur,
  onChangeValue,
}: CheckboxRendererProps<Meta>): React.ReactElement {
  const onChangeChecked = React.useCallback(
    (checked: boolean) => {
      if (checked) {
        onChangeValue(true);
      } else {
        onChangeValue(null);
      }
    },
    [onChangeValue],
  );
  return (
    <Checkbox
      name={name}
      checked={value === true}
      onBlur={onBlur}
      onChangeChecked={onChangeChecked}
    />
  );
});
