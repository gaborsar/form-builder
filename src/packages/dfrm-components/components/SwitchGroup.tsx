import cs from "classnames";
import React from "react";
import { Switch } from "./Switch";
import "./SwitchGroup.css";

interface SwitchGroupProps {
  name: string;
  direction?: "vertical" | "horizontal";
  columns?: number;
  options: { label: string; value: string }[];
  value: string[];
  onFocus?(): unknown;
  onBlur?(): unknown;
  onChangeValue(value: string[]): unknown;
}

const noop = () => {};

export const SwitchGroup: React.FunctionComponent<SwitchGroupProps> = React.memo(
  ({
    name,
    direction = "vertical",
    columns = 1,
    options,
    value,
    onFocus = noop,
    onBlur = noop,
    onChangeValue,
  }) => (
    <div
      className={cs(
        "dfrm-switch-group",
        `dfrm-switch-group--${direction}`,
        `dfrm-switch-group--${columns}`,
      )}
    >
      {options.map((option, i) => (
        <div key={option.value || i} className="dfrm-switch-group__item">
          <Switch
            name={`${name}${i}`}
            checked={value.includes(option.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            onChangeChecked={(checked) => {
              const set = new Set(value);
              if (checked) {
                set.add(option.value);
              } else {
                set.delete(option.value);
              }
              onChangeValue(Array.from(set.values()));
            }}
          />
          <label htmlFor={`${name}${i}`}>{option.label}</label>
        </div>
      ))}
    </div>
  ),
);
