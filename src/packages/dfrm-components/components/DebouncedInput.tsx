import React from "react";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

interface DebouncedInputProps {
  type: "text" | "date" | "time" | "email" | "tel" | "password" | "number";
  disabled?: boolean;
  autoFocus?: boolean;
  id: string;
  placeholder?: string;
  value: string;
  onFocus?(event: React.FocusEvent<HTMLInputElement>): unknown;
  onBlur?(event: React.FocusEvent<HTMLInputElement>): unknown;
  onWheel?(event: React.MouseEvent<HTMLInputElement>): unknown;
  onKeyDown?(event: React.KeyboardEvent<HTMLInputElement>): unknown;
  onChangeValue(value: string): unknown;
}

const noop = () => {};

export const DebouncedInput = React.memo(
  React.forwardRef(
    (
      {
        type,
        disabled,
        autoFocus,
        id,
        value,
        placeholder,
        onFocus = noop,
        onBlur = noop,
        onKeyDown = noop,
        onWheel = noop,
        onChangeValue,
      }: DebouncedInputProps,
      ref: React.ForwardedRef<HTMLInputElement | null>,
    ): React.ReactElement => {
      const { debouncedValue, prepareChange, forceChange } = useDebouncedValue({
        value,
        onChangeValue,
      });

      const onBlurInner = React.useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => {
          forceChange();
          onBlur(event);
        },
        [forceChange, onBlur],
      );

      const onKeyDownInner = React.useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.key === "Enter") {
            forceChange();
          }
          onKeyDown(event);
        },
        [forceChange, onKeyDown],
      );

      const onChange = React.useCallback(
        ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
          prepareChange(value);
        },
        [prepareChange],
      );

      return (
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          autoFocus={autoFocus}
          id={id}
          placeholder={placeholder}
          value={debouncedValue}
          onFocus={onFocus}
          onBlur={onBlurInner}
          onKeyDown={onKeyDownInner}
          onWheel={onWheel}
          onChange={onChange}
        />
      );
    },
  ),
);
