import cs from "classnames";
import React from "react";
import { VscSearch } from "react-icons/vsc";
import { DebouncedInput } from "./DebouncedInput";
import "./SearchInput.css";

interface SearchInputProps {
  disabled?: boolean;
  name: string;
  placeholder?: string;
  value: string;
  onFocus?(): unknown;
  onBlur?(): unknown;
  onChangeValue(value: string): unknown;
}

const noop = () => {};

export const SearchInput: React.FunctionComponent<SearchInputProps> = React.memo(
  ({ disabled, name, placeholder, value, onFocus = noop, onBlur = noop, onChangeValue }) => {
    const [isFocused, setFocused] = React.useState(false);

    const onFocusInner = React.useCallback(() => {
      setFocused(true);
      onFocus();
    }, [onFocus]);

    const onBlurInner = React.useCallback(() => {
      setFocused(false);
      onBlur();
    }, [onBlur]);

    return (
      <div
        className={cs("dfrm-search-input", {
          "dfrm-search-input--disabled": disabled,
          "dfrm-search-input--focused": isFocused,
        })}
      >
        <div className="dfrm-search-input__icon">
          <VscSearch />
        </div>
        <DebouncedInput
          type="text"
          disabled={disabled}
          id={name}
          placeholder={placeholder}
          value={value}
          onFocus={onFocusInner}
          onBlur={onBlurInner}
          onChangeValue={onChangeValue}
        />
      </div>
    );
  },
);
