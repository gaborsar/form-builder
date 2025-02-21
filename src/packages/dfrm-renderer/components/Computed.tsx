import { NumberInput } from "dfrm-components";
import type { RenderComputedResult } from "dfrm-schema";
import React from "react";

const noop = () => {};

export const ComputedRenderer = React.memo(function ComputedRenderer<Meta>({
  name,
  value,
  unit,
}: RenderComputedResult<Meta>): React.ReactElement {
  return (
    <NumberInput
      name={name}
      disabled={true}
      value={value === undefined || value === null ? "" : `${value}`}
      unit={unit}
      onBlur={noop}
      onChangeValue={noop}
    />
  );
});
