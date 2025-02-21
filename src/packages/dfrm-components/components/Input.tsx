import cs from "classnames";
import React from "react";
import { DebouncedInput } from "./DebouncedInput";
import "./Input.css";

interface InputProps {
  type: "text" | "date" | "time" | "email" | "tel";
  disabled?: boolean;
  autoFocus?: boolean;
  name: string;
  value: string;
  placeholder?: string;
  helper?: string;
  onFocus?(): unknown;
  onBlur?(): unknown;
  onChangeValue(value: string): unknown;
}

const noop = () => {};

export const Input: React.FunctionComponent<InputProps> = React.memo(
  ({
    type,
    disabled,
    autoFocus,
    name,
    value,
    placeholder,
    helper,
    onFocus = noop,
    onBlur = noop,
    onChangeValue,
  }) => {
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
        className={cs("dfrm-input", {
          "dfrm-input--disabled": disabled,
          "dfrm-input--focused": isFocused,
        })}
      >
        <DebouncedInput
          type={type}
          disabled={disabled}
          autoFocus={autoFocus}
          id={name}
          placeholder={placeholder}
          value={value}
          onFocus={onFocusInner}
          onBlur={onBlurInner}
          onChangeValue={onChangeValue}
        />
        {helper !== undefined && <div className="dfrm-input__helper">{helper}</div>}
      </div>
    );
  },
);
