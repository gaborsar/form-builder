import cs from "classnames";
import React from "react";
import { DebouncedTextArea } from "./DebouncedTextArea";
import "./LongText.css";

interface LongTextProps {
  name: string;
  value: string;
  onFocus?(): unknown;
  onBlur?(): unknown;
  onChangeValue(value: string): unknown;
}

const noop = () => {};

export const LongText: React.FunctionComponent<LongTextProps> = React.memo(
  ({ name, value, onFocus = noop, onBlur = noop, onChangeValue }) => {
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
        className={cs("dfrm-long-text", {
          "dfrm-long-text--focused": isFocused,
        })}
      >
        <DebouncedTextArea
          id={name}
          rows={5}
          value={value}
          onFocus={onFocusInner}
          onBlur={onBlurInner}
          onChangeValue={onChangeValue}
        />
      </div>
    );
  },
);
