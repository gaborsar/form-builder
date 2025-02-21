import React from "react";
import { SwitchGroup } from "../../dfrm-components";
import type { RenderSwitchGroupResult } from "../../dfrm-schema";

interface SwitchGroupRendererProps<Meta> extends RenderSwitchGroupResult<Meta> {
  onBlur(): unknown;
  onChangeValue(value: unknown): unknown;
}

export const SwitchGroupRenderer = React.memo(function SwitchGroupRenderer<Meta>({
  name,
  direction,
  columns,
  options,
  value,
  onBlur,
  onChangeValue,
}: SwitchGroupRendererProps<Meta>): React.ReactElement {
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
    <SwitchGroup
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
