import cs from "classnames";
import React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { DebouncedInput } from "./DebouncedInput";
import "./Password.css";

interface PasswordProps {
  name: string;
  value: string;
  onFocus?(): unknown;
  onBlur?(): unknown;
  onChangeValue(value: string): unknown;
}

const noop = () => {};

export const Password: React.FunctionComponent<PasswordProps> = React.memo(
  ({ name, value, onFocus = noop, onBlur = noop, onChangeValue }) => {
    const [isInputFocused, setInputFocused] = React.useState(false);
    const [isButtonFocused, setButtonFocused] = React.useState(false);
    const [isVisible, setVisible] = React.useState(false);

    const isFocused = isInputFocused || isButtonFocused;

    const onFocusInput = React.useCallback(() => {
      setInputFocused(true);
      onFocus();
    }, [onFocus]);

    const onBlurInput = React.useCallback(() => {
      setInputFocused(false);
      onBlur();
    }, [onBlur]);

    const onFocusButton = React.useCallback(() => {
      setButtonFocused(true);
    }, []);

    const onBlurButton = React.useCallback(() => {
      setButtonFocused(false);
    }, []);

    const onClickButton = React.useCallback(() => {
      setVisible((isVisible) => !isVisible);
    }, []);

    return (
      <div
        className={cs("dfrm-password", {
          "dfrm-password--focused": isFocused,
        })}
      >
        <DebouncedInput
          type={isVisible ? "text" : "password"}
          id={name}
          value={value}
          onFocus={onFocusInput}
          onBlur={onBlurInput}
          onChangeValue={onChangeValue}
        />
        <button type="button" onFocus={onFocusButton} onBlur={onBlurButton} onClick={onClickButton}>
          {isVisible ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
    );
  },
);
