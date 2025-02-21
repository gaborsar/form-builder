import cs from "classnames";
import React from "react";
import "./Radio.css";

interface RadioProps {
  name: string;
  checked: boolean;
  onFocus?(): unknown;
  onBlur?(): unknown;
  onChangeChecked(checked: boolean): unknown;
}

const noop = () => {};

export const Radio: React.FunctionComponent<RadioProps> = React.memo(
  ({ name, checked, onFocus = noop, onBlur = noop, onChangeChecked }) => {
    const [isFocused, setFocused] = React.useState(false);

    const boxRef = React.useRef<HTMLDivElement>(null);

    const onFocusInner = React.useCallback(() => {
      setFocused(true);
      onFocus();
    }, [onFocus]);

    const onBlurInner = React.useCallback(() => {
      setFocused(false);
      onBlur();
    }, [onBlur]);

    const onClick = React.useCallback(() => {
      onChangeChecked(!checked);
    }, [onChangeChecked, checked]);

    const onKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        if (event.key === " ") {
          event.preventDefault();
          onClick();
        }
      },
      [onClick],
    );

    React.useEffect(() => {
      const handler = (event: Event) => {
        event.preventDefault();
        const { current: box } = boxRef;
        if (box !== null) {
          box.focus();
        }
        onClick();
      };
      const label = document.querySelector(`label[for="${name}"]`);
      if (label !== null) {
        label.addEventListener("mousedown", handler);
      }
      return () => {
        if (label !== null) {
          label.removeEventListener("mousedown", handler);
        }
      };
    }, [name, onClick]);

    return (
      <div
        className={cs("dfrm-radio", {
          "dfrm-radio--checked": checked,
          "dfrm-radio--focused": isFocused,
        })}
      >
        <div
          className="dfrm-radio__box"
          ref={boxRef}
          tabIndex={0}
          onFocus={onFocusInner}
          onBlur={onBlurInner}
          onClick={onClick}
          onKeyDown={onKeyDown}
        />
        <div className="dfrm-radio__checkmark" />
      </div>
    );
  },
);
