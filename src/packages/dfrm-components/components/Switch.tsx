import React from "react";
import cs from "classnames";
import "./Switch.css";

interface SwitchProps {
  name: string;
  checked: boolean;
  onFocus?(): unknown;
  onBlur?(): unknown;
  onChangeChecked(checked: boolean): unknown;
}

const noop = () => {};

export const Switch: React.FunctionComponent<SwitchProps> = React.memo(
  ({ name, checked, onFocus = noop, onBlur = noop, onChangeChecked }) => {
    const [isFocused, setFocused] = React.useState(false);

    const trackRef = React.useRef<HTMLDivElement>(null);

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
        const { current: track } = trackRef;
        if (track !== null) {
          track.focus();
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
        className={cs("dfrm-switch", {
          "dfrm-switch--checked": checked,
          "dfrm-switch--focused": isFocused,
        })}
      >
        <div
          className="dfrm-switch__track"
          ref={trackRef}
          tabIndex={0}
          onFocus={onFocusInner}
          onBlur={onBlurInner}
          onClick={onClick}
          onKeyDown={onKeyDown}
        />
        <div className="dfrm-switch__thumb" />
      </div>
    );
  },
);
