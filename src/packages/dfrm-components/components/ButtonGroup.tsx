import cs from "classnames";
import React from "react";
import "./ButtonGroup.css";

interface ButtonGroupProps {
  options: { label: string; value: string }[];
  value: string;
  onFocus?(): unknown;
  onBlur?(): unknown;
  onChangeValue(value: string): unknown;
}

const noop = () => {};

export const ButtonGroup: React.FunctionComponent<React.PropsWithChildren<ButtonGroupProps>> =
  React.memo(({ value, options, onFocus = noop, onBlur = noop, onChangeValue }) => (
    <div className="dfrm-button-group">
      {options.map((option, i) => (
        <React.Fragment key={option.value || i}>
          {i !== 0 && <div className="dfrm-button-group__separator" />}
          <ButtonGroupItem
            checked={option.value === value}
            onFocus={onFocus}
            onBlur={onBlur}
            onChangeChecked={(checked) => {
              if (checked) {
                onChangeValue(option.value);
              } else {
                onChangeValue("");
              }
            }}
          >
            {option.label}
          </ButtonGroupItem>
        </React.Fragment>
      ))}
    </div>
  ));

interface ButtonGroupItemProps {
  checked: boolean;
  onFocus(): unknown;
  onBlur(): unknown;
  onChangeChecked(checked: boolean): unknown;
}

const ButtonGroupItem: React.FunctionComponent<React.PropsWithChildren<ButtonGroupItemProps>> =
  React.memo(({ checked, onFocus, onBlur, onChangeChecked, children }) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);

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

    return (
      <div
        ref={containerRef}
        tabIndex={0}
        className={cs("dfrm-button-group__item", {
          "dfrm-button-group__item--checked": checked,
        })}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        {children}
      </div>
    );
  });
