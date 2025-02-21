import cs from "classnames";
import React from "react";
import { useBlurCallback } from "../hooks/useBlurCallback";
import { useFocusCallback } from "../hooks/useFocusCallback";
import { DebouncedInput } from "./DebouncedInput";
import "./Number.css";

interface NumberInputProps {
  disabled?: boolean;
  name: string;
  defaultValue?: string;
  value: string;
  unit?: string;
  onFocus?(): unknown;
  onBlur?(): unknown;
  onChangeValue(value: string): unknown;
}

const noop = () => {};

export const NumberInput: React.FunctionComponent<NumberInputProps> = React.memo(
  ({ disabled = false, name, value, unit, onFocus = noop, onBlur = noop, onChangeValue }) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const focus = useFocusCallback(inputRef);
    const blur = useBlurCallback(inputRef);

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
        className={cs("dfrm-number", {
          "dfrm-number--disabled": disabled,
          "dfrm-number--focused": isFocused,
        })}
        onClick={focus}
      >
        <DebouncedInput
          ref={inputRef}
          type="number"
          disabled={disabled}
          id={name}
          value={value}
          onWheel={blur}
          onFocus={onFocusInner}
          onBlur={onBlurInner}
          onChangeValue={onChangeValue}
        />
        {unit !== undefined && <div className="dfrm-number__unit">{unit}</div>}
      </div>
    );
  },
);
