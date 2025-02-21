import { Dropdown } from "dfrm-components";
import type { RenderRemoteDropdownResult } from "dfrm-schema";
import React from "react";

interface RemoteDropdownRendererProps<Meta> extends RenderRemoteDropdownResult<Meta> {
  onBlur(): unknown;
  onChangeValue(value: unknown): unknown;
}

export const RemoteDropdownRenderer = React.memo(function RemoteDropdownRenderer<Meta>({
  name,
  selectMessage,
  searchMessage,
  noOptionsMessage,
  options,
  value,
  onBlur,
  onChangeValue,
}: RemoteDropdownRendererProps<Meta>): React.ReactElement {
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
