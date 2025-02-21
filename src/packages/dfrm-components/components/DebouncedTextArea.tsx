import React from "react";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

interface DebouncedTextAreaProps {
  disabled?: boolean;
  autoFocus?: boolean;
  id: string;
  placeholder?: string;
  rows?: number;
  value: string;
  onFocus?(event: React.FocusEvent<HTMLTextAreaElement>): unknown;
  onBlur?(event: React.FocusEvent<HTMLTextAreaElement>): unknown;
  onWheel?(event: React.MouseEvent<HTMLTextAreaElement>): unknown;
  onKeyDown?(event: React.KeyboardEvent<HTMLTextAreaElement>): unknown;
  onChangeValue(value: string): unknown;
}

const noop = () => {};

export const DebouncedTextArea = React.memo(
  React.forwardRef(
    (
      {
        disabled,
        autoFocus,
        id,
        value,
        placeholder,
        rows,
        onFocus = noop,
        onBlur = noop,
        onKeyDown = noop,
        onWheel = noop,
        onChangeValue,
      }: DebouncedTextAreaProps,
      ref: React.ForwardedRef<HTMLTextAreaElement | null>,
    ): React.ReactElement => {
      const { debouncedValue, prepareChange, forceChange } = useDebouncedValue({
        value,
        onChangeValue,
      });

      const onBlurInner = React.useCallback(
        (event: React.FocusEvent<HTMLTextAreaElement>) => {
          forceChange();
          onBlur(event);
        },
        [forceChange, onBlur],
      );

      const onKeyDownInner = React.useCallback(
        (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
          if (event.key === "Enter") {
            forceChange();
          }
          onKeyDown(event);
        },
        [forceChange, onKeyDown],
      );

      const onChange = React.useCallback(
        ({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>) => {
          prepareChange(value);
        },
        [prepareChange],
      );

      return (
        <textarea
          ref={ref}
          disabled={disabled}
          autoFocus={autoFocus}
          id={id}
          placeholder={placeholder}
          rows={rows}
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
