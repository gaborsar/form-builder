import { Slider } from "dfrm-components";
import type { RenderSliderResult } from "dfrm-schema";
import React from "react";

interface SliderRendererProps<Meta> extends RenderSliderResult<Meta> {
  onBlur(): unknown;
  onChangeValue(value: unknown): unknown;
}

export const SliderRenderer = React.memo(function SliderRenderer<Meta>({
  name,
  options,
  value,
  onBlur,
  onChangeValue,
}: SliderRendererProps<Meta>): React.ReactElement {
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
    <Slider
      name={name}
      options={options}
      value={value === undefined || value === null ? "" : `${value}`}
      onBlur={onBlur}
      onChangeValue={onChangeValueInner}
    />
  );
});
