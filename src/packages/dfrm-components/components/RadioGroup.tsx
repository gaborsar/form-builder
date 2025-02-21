import cs from "classnames";
import React from "react";
import { Radio } from "./Radio";
import "./RadioGroup.css";

interface RadioGroupProps {
  name: string;
  direction?: "vertical" | "horizontal";
  columns?: number;
  options: { label: string; value: string }[];
  value: string;
  onFocus?(): unknown;
  onBlur?(): unknown;
  onChangeValue(value: string): unknown;
}

const noop = () => {};

export const RadioGroup: React.FunctionComponent<RadioGroupProps> = React.memo(
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
        "dfrm-radio-group",
        `dfrm-radio-group--${direction}`,
        `dfrm-radio-group--${columns}`,
      )}
    >
      {options.map((option, i) => (
        <div key={option.value || i} className="dfrm-radio-group__item">
          <Radio
            name={`${name}${i}`}
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
          />
          <label htmlFor={`${name}${i}`}>{option.label}</label>
        </div>
      ))}
    </div>
  ),
);
