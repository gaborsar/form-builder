import { Switch } from "dfrm-components";
import type { RenderSwitchResult } from "dfrm-schema";
import React from "react";

interface SwitchRendererProps<Meta> extends RenderSwitchResult<Meta> {
  onBlur(): unknown;
  onChangeValue(value: unknown): unknown;
}

export const SwitchRenderer = React.memo(function SwitchRenderer<Meta>({
  name,
  value,
  onBlur,
  onChangeValue,
}: SwitchRendererProps<Meta>): React.ReactElement {
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
    <Switch
      name={name}
      checked={value === true}
      onBlur={onBlur}
      onChangeChecked={onChangeChecked}
    />
  );
});
