import cs from "classnames";
import React from "react";
import { MdClose, MdExpandMore } from "react-icons/md";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { scrollIntoView } from "../utils/scrollIntoView";
import "./MultiSelect.css";

// TODO breakup

interface MultiSelectProps {
  name: string;
  selectMessage?: string;
  searchMessage?: string;
  noOptionsMessage?: string;
  options: { label: string; value: string }[];
  value: string[];
  onFocus?(): unknown;
  onBlur?(): unknown;
  onChangeValue(value: string[]): unknown;
}

const noop = () => {};

export const MultiSelect: React.FunctionComponent<MultiSelectProps> = React.memo(
  ({
    name,
    selectMessage = "Please select...",
    searchMessage = "Search",
    noOptionsMessage = "No options",
    options,
    value,
    onFocus = noop,
    onBlur = noop,
    onChangeValue,
  }) => {
    const containerElRef = React.useRef<HTMLInputElement>(null);
    const queryElRef = React.useRef<HTMLInputElement | null>(null);

    const [isContainerFocused, setContainerFocused] = React.useState(false);
    const [isQueryFocused, setQueryFocused] = React.useState(false);
    const isFocused = isContainerFocused || isQueryFocused;

    const [isOpen, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const [index, setIndex] = React.useState(0);

    const filteredOptions = React.useMemo(() => {
      const lowerQuery = query.toLowerCase();
      return options.filter((option) => option.label.toLowerCase().includes(lowerQuery));
    }, [options, query]);

    const selectedOptions = React.useMemo(
      () => options.filter((option) => value.includes(option.value)),
      [options, value],
    );

    React.useEffect(() => {
      const handler = (event: Event) => {
        event.preventDefault();
        const { current: container } = containerElRef;
        if (container !== null) {
          container.focus();
        }
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
    }, [name]);

    const isFirstBlurRef = React.useRef(true);

    React.useEffect(() => {
      if (isFocused) {
        onFocus();
      } else {
        if (isFirstBlurRef.current) {
          isFirstBlurRef.current = false;
        } else {
          onBlur();
        }
      }
    }, [isFocused, onFocus, onBlur]);

    React.useEffect(() => {
      setIndex((index) => Math.max(Math.min(index, filteredOptions.length - 1), 0));
    }, [filteredOptions]);

    const onFocusContainer = React.useCallback(() => {
      setContainerFocused(true);
    }, []);

    const onBlurContainer = React.useCallback(() => {
      setContainerFocused(false);
    }, []);

    const onFocusQuery = React.useCallback(() => {
      setQueryFocused(true);
    }, []);

    const onBlurQuery = React.useCallback(() => {
      setQueryFocused(false);
    }, []);

    const onLeave = React.useCallback(() => {
      setOpen(false);
    }, []);

    useOnClickOutside(containerElRef, onLeave);

    const scrollToOption = React.useCallback((index: number, smooth: boolean) => {
      window.requestAnimationFrame(() => {
        const { current: containerEl } = containerElRef;
        if (containerEl === null) {
          return;
        }
        const option = containerEl.querySelector(
          `.dfrm-multi-select__option:nth-child(${index + 1})`,
        );
        if (option === null) {
          return;
        }
        scrollIntoView(option, smooth);
      });
    }, []);

    const onOpenMenu = React.useCallback(() => {
      setOpen(true);
      setQuery("");
      let index = 0;
      if (value.length !== 0) {
        index = filteredOptions.findIndex((option) => value.includes(option.value));
      }
      setIndex(index);
      window.requestAnimationFrame(() => {
        const { current: queryEl } = queryElRef;
        if (queryEl !== null) {
          queryEl.focus();
        }
        scrollToOption(index, false);
      });
    }, [value, filteredOptions, scrollToOption]);

    const onCloseMenu = React.useCallback(() => {
      setOpen(false);
      window.requestAnimationFrame(() => {
        const { current: containerEl } = containerElRef;
        if (containerEl !== null) {
          containerEl.focus();
        }
      });
    }, []);

    const onClickOpenMenu = React.useCallback(
      (event: React.MouseEvent) => {
        event.preventDefault();
        onOpenMenu();
      },
      [onOpenMenu],
    );

    const onHoverOption = React.useCallback((index: number) => {
      setIndex(index);
    }, []);

    const onToggleOption = React.useCallback(
      (index: number) => {
        const set = new Set(value);
        const itemValue = filteredOptions[index].value;
        if (set.has(itemValue)) {
          set.delete(itemValue);
        } else {
          set.add(itemValue);
        }
        onChangeValue(Array.from(set.values()));
        setQuery("");
      },
      [value, filteredOptions, onChangeValue],
    );

    const onClear = React.useCallback(() => {
      onChangeValue([]);
    }, [onChangeValue]);

    const onClickClear = React.useCallback(
      (event: React.MouseEvent) => {
        event.preventDefault();
        onClear();
        if (!isFocused) {
          const { current: container } = containerElRef;
          if (container !== null) {
            container.focus();
          }
        }
      },
      [isFocused, onClear],
    );

    const onKeyDownContainer = React.useCallback(
      (event: React.KeyboardEvent) => {
        event.stopPropagation();
        if (
          event.key === "ArrowUp" ||
          event.key === "ArrowDown" ||
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          onOpenMenu();
        } else if (event.key === "Delete" || event.key === "Backspace") {
          event.preventDefault();
          onClear();
        }
      },
      [onOpenMenu, onClear],
    );

    const onChangeQuery = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    }, []);

    const onKeyDownQuery = React.useCallback(
      (event: React.KeyboardEvent) => {
        event.stopPropagation();
        if (event.key === "ArrowUp") {
          event.preventDefault();
          const nextIndex = Math.max(index - 1, 0);
          setIndex(nextIndex);
          scrollToOption(nextIndex, true);
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          const nextIndex = Math.max(Math.min(index + 1, filteredOptions.length - 1), 0);
          setIndex(nextIndex);
          scrollToOption(nextIndex, true);
        } else if (event.key === " ") {
          if (query === "" && filteredOptions.length !== 0) {
            event.preventDefault();
            onToggleOption(index);
          }
        } else if (event.key === "Enter") {
          if (filteredOptions.length !== 0) {
            event.preventDefault();
            onToggleOption(index);
          }
        } else if (event.key === "Escape") {
          event.preventDefault();
          onCloseMenu();
        } else if (event.key === "Tab") {
          onLeave();
        }
      },
      [query, index, filteredOptions, scrollToOption, onToggleOption, onCloseMenu, onLeave],
    );

    return (
      <div
        ref={containerElRef}
        tabIndex={0}
        onFocus={onFocusContainer}
        onBlur={onBlurContainer}
        onKeyDown={onKeyDownContainer}
        className={cs("dfrm-multi-select", {
          "dfrm-multi-select--focused": isFocused,
          "dfrm-multi-select--open": isOpen,
        })}
      >
        <div className="dfrm-multi-select__control">
          <div className="dfrm-multi-select__value-container" onMouseDown={onClickOpenMenu}>
            {selectedOptions.length === 0 ? (
              <div className="dfrm-multi-select__placeholder">{selectMessage}</div>
            ) : (
              <div className="dfrm-multi-select__value">
                {selectedOptions.map(({ label, value }) => (
                  <div key={value} className="dfrm-multi-select__value__item">
                    {label}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="dfrm-multi-select__button-container">
            <button
              type="button"
              className="dfrm-multi-select__button"
              tabIndex={-1}
              disabled={value.length === 0}
              onMouseDown={onClickClear}
            >
              <MdClose />
            </button>
            <button
              type="button"
              className="dfrm-multi-select__button"
              tabIndex={-1}
              onMouseDown={onClickOpenMenu}
            >
              <MdExpandMore />
            </button>
          </div>
        </div>
        <div className="dfrm-multi-select__menu">
          <input
            ref={queryElRef}
            type="text"
            className="dfrm-multi-select__query"
            tabIndex={-1}
            placeholder={searchMessage}
            value={query}
            onFocus={onFocusQuery}
            onBlur={onBlurQuery}
            onChange={onChangeQuery}
            onKeyDown={onKeyDownQuery}
          />
          <div className="dfrm-multi-select__option-list">
            {filteredOptions.length === 0 ? (
              <div className="dfrm-multi-select__no-options">{noOptionsMessage}</div>
            ) : (
              filteredOptions.map((option, i) => (
                <MultiSelectOption
                  key={option.value || i}
                  isActive={index === i}
                  isSelected={value.includes(option.value)}
                  index={i}
                  onHover={onHoverOption}
                  onToggle={onToggleOption}
                >
                  {option.label}
                </MultiSelectOption>
              ))
            )}
          </div>
        </div>
      </div>
    );
  },
);

interface MultiSelectOptionProps {
  index: number;
  isActive: boolean;
  isSelected: boolean;
  onHover(index: number): unknown;
  onToggle(index: number): unknown;
}

const MultiSelectOption: React.FunctionComponent<React.PropsWithChildren<MultiSelectOptionProps>> =
  React.memo(({ index, isActive, isSelected, onHover, onToggle, children }) => {
    const onHoverInner = React.useCallback(() => {
      onHover(index);
    }, [onHover, index]);

    const onToggleInner = React.useCallback(
      (event: React.MouseEvent) => {
        event.preventDefault();
        onToggle(index);
      },
      [onToggle, index],
    );

    return (
      <div
        className={cs("dfrm-multi-select__option", {
          "dfrm-multi-select__option--active": isActive,
          "dfrm-multi-select__option--selected": isSelected,
        })}
        onMouseOver={onHoverInner}
        onMouseDown={onToggleInner}
      >
        <div className="dfrm-multi-select__option__checkmark-container">
          <div className="dfrm-multi-select__option__checkmark">
            <div className="dfrm-multi-select__option__line" />
            <div className="dfrm-multi-select__option__line" />
          </div>
        </div>
        <div className="dfrm-multi-select__option__label">{children}</div>
      </div>
    );
  });
