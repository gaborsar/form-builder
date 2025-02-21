import React from "react";
import { ButtonGroup } from "../../dfrm-components";
import type { RenderButtonGroupResult } from "../../dfrm-schema";

interface ButtonGroupRendererProps<Meta> extends RenderButtonGroupResult<Meta> {
  onBlur(): unknown;
  onChangeValue(value: unknown): unknown;
}

export const ButtonGroupRenderer = React.memo(function ButtonGroupRenderer<Meta>({
  options,
  value,
  onBlur,
  onChangeValue,
}: ButtonGroupRendererProps<Meta>): React.ReactElement {
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
    <ButtonGroup
      options={options}
      value={value === undefined || value === null ? "" : (value as string)}
      onBlur={onBlur}
      onChangeValue={onChangeValueInner}
    />
  );
});
