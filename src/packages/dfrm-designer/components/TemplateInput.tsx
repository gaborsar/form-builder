import cs from "classnames";
import React from "react";
import "./TemplateInput.css";

interface TemplateInputProps {
  name: string;
  value: string;
  onBlur?(): unknown;
  onChangeValue(value: string): unknown;
}

const noop = () => {};

const functionOptions = [
  { value: "ISTEXT", label: "ISTEXT(value)" },
  { value: "ISNUMBER", label: "ISNUMBER(value)" },
  { value: "ISLOGICAL", label: "ISLOGICAL(value)" },
  { value: "ISOBJECT", label: "ISOBJECT(value)" },
  { value: "ISLIST", label: "ISLIST(value)" },
  { value: "LENGTH", label: "LENGTH(value)" },
  { value: "IF", label: "IF(condition, thenValue, elseValue?)" },
  { value: "AND", label: "AND(...condition)" },
  { value: "OR", label: "OR(...condition)" },
  { value: "NOT", label: "NOT(condition)" },
  { value: "EQ", label: "EQ(value1, value2)" },
  { value: "INCLUDES", label: "INCLUDES(values, value)" },
  { value: "LT", label: "LT(value1, value2)" },
  { value: "GT", label: "GT(value1, value2)" },
  { value: "LTE", label: "LTE(value1, value2)" },
  { value: "GTE", label: "GTE(value1, value2)" },
  { value: "ROUND", label: "ROUND(value, precision?)" },
  { value: "FLOOR", label: "FLOOR(value)" },
  { value: "CEILING", label: "CEILING(value)" },
  { value: "MOD", label: "MOD(dividend, divisor)" },
  { value: "POWER", label: "POWER(base, exponent)" },
  { value: "SQRT", label: "SQRT(value)" },
];

// EQ({../x}, "")
// INCLUDES({../x}, "")
// {../x} == ""
// {../x} === ""
// {../x} != ""
// {../x} !== ""

export const TemplateInput: React.FunctionComponent<TemplateInputProps> = React.memo(
  ({ name, value, onBlur = noop, onChangeValue }) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const [isFocused, setFocused] = React.useState(false);
    const [offset, setOffset] = React.useState(-1);

    const autoCompleteOptions = React.useMemo(() => {
      const matches = value.slice(0, offset).trim().match(/\w+$/);
      const query = matches === null ? "" : matches[0].toLowerCase();
      return query === ""
        ? functionOptions
        : functionOptions.filter((option) => option.value.toLowerCase().includes(query));
    }, [value, offset]);

    const onFocus = React.useCallback(() => {
      setFocused(true);
    }, []);

    const onChangeOffset = React.useCallback(
      (event: React.SyntheticEvent<HTMLInputElement, Event>) => {
        if (event.target === null) {
          setOffset(-1);
        } else {
          const { selectionStart, selectionEnd } = event.target as HTMLInputElement;
          if (selectionStart !== null && selectionStart === selectionEnd) {
            setOffset(selectionStart);
          } else {
            setOffset(-1);
          }
        }
      },
      [],
    );

    const onSelectOption = React.useCallback(
      (optionValue: string) => {
        const leftValue = `${value.slice(0, offset).replace(/\w+$/, "")}${optionValue}(`;
        const rightValue = `)${value.slice(offset)}`;
        const nextValue = leftValue + rightValue;
        onChangeValue(nextValue);
        window.requestAnimationFrame(() => {
          const { current: input } = inputRef;
          if (input === null) {
            return;
          }
          input.setSelectionRange(leftValue.length, leftValue.length);
        });
      },
      [onChangeValue, value, offset],
    );

    const onKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        if ((event.key === "Enter" || event.key === "Tab") && autoCompleteOptions.length !== 0) {
          event.preventDefault();
          event.stopPropagation();
          onSelectOption(autoCompleteOptions[0].value);
        }
      },
      [onSelectOption, autoCompleteOptions],
    );

    const onChange = React.useCallback(
      ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        onChangeValue(value);
      },
      [onChangeValue],
    );

    const onBlurInner = React.useCallback(() => {
      setFocused(false);
      onBlur();
    }, [onBlur]);

    return (
      <div
        className={cs("app-template-input", {
          "app-template-input--focused": isFocused,
        })}
      >
        <div className="app-template-input__control">
          <input
            ref={inputRef}
            type="text"
            id={name}
            value={value}
            onFocus={onFocus}
            onBlur={onBlurInner}
            onSelect={onChangeOffset}
            onKeyDown={onKeyDown}
            onChange={onChange}
          />
        </div>
        {autoCompleteOptions.length !== 0 && (
          <div className="app-template-input__menu">
            <div className="app-template-input__option-list">
              {autoCompleteOptions.map((option) => (
                <AutoCompleteOption
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  onSelect={onSelectOption}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);

interface AutoCompleteOptionProps {
  label: string;
  value: string;
  onSelect(value: string): unknown;
}

const AutoCompleteOption: React.FunctionComponent<AutoCompleteOptionProps> = React.memo(
  ({ label, value, onSelect }) => {
    const onMouseDown = React.useCallback(
      (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        onSelect(value);
      },
      [onSelect, value],
    );
    return (
      <div className="app-template-input__option" onMouseDown={onMouseDown}>
        {label}
      </div>
    );
  },
);
