import React from "react";
import { MultiSelect } from "../../dfrm-components";
import type { RenderMultiSelectResult } from "../../dfrm-schema";

interface MultiSelectRendererProps<Meta> extends RenderMultiSelectResult<Meta> {
  onBlur(): unknown;
  onChangeValue(value: unknown): unknown;
}

export const MultiSelectRenderer = React.memo(function MultiSelectRenderer<Meta>({
  name,
  selectMessage,
  searchMessage,
  noOptionsMessage,
  options,
  value,
  onBlur,
  onChangeValue,
}: MultiSelectRendererProps<Meta>): React.ReactElement {
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
    <MultiSelect
      name={name}
      selectMessage={selectMessage}
      searchMessage={searchMessage}
      noOptionsMessage={noOptionsMessage}
      options={options}
      value={value === undefined || value === null ? [] : (value as string[])}
      onBlur={onBlur}
      onChangeValue={onChangeValueInner}
    />
  );
});
