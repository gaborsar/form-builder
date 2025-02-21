import { Dropdown } from "dfrm-components";
import type { RenderDropdownResult } from "dfrm-schema";
import React from "react";

interface DropdownRendererProps<Meta> extends RenderDropdownResult<Meta> {
  onBlur(): unknown;
  onChangeValue(value: unknown): unknown;
}

export const DropdownRenderer = React.memo(function DropdownRenderer<Meta>({
  name,
  selectMessage,
  searchMessage,
  noOptionsMessage,
  options,
  value,
  onBlur,
  onChangeValue,
}: DropdownRendererProps<Meta>): React.ReactElement {
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
    <Dropdown
      name={name}
      selectMessage={selectMessage}
      searchMessage={searchMessage}
      noOptionsMessage={noOptionsMessage}
      options={options}
      value={value === undefined || value === null ? "" : `${value}`}
      onBlur={onBlur}
      onChangeValue={onChangeValueInner}
    />
  );
});
