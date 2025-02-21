import cs from "classnames";
import React from "react";
import { Checkbox } from "./Checkbox";
import "./CheckboxGroup.css";

interface CheckboxGroupProps {
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

export const CheckboxGroup: React.FunctionComponent<CheckboxGroupProps> = React.memo(
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
        "dfrm-checkbox-group",
        `dfrm-checkbox-group--${direction}`,
        `dfrm-checkbox-group--${columns}`,
      )}
    >
      {options.map((option, i) => (
        <div key={option.value || i} className="dfrm-checkbox-group__item">
          <Checkbox
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
