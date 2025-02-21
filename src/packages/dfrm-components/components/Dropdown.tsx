import cs from "classnames";
import React from "react";
import { MdClose, MdExpandMore, MdOpenInNew } from "react-icons/md";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { scrollIntoView } from "../utils/scrollIntoView";
import "./Dropdown.css";

// TODO breakup

interface DropdownProps {
  name: string;
  canClear?: boolean;
  canOpen?: boolean;
  canCreate?: boolean;
  selectMessage?: string;
  searchMessage?: string;
  noOptionsMessage?: string;
  createMessage?: string;
  options: { label: string; value: string }[];
  value: string;
  onFocus?(): unknown;
  onBlur?(): unknown;
  onChangeValue(value: string): unknown;
  onOpen?(value: string): unknown;
  onCreate?(value: string): unknown;
}

const noop = () => {};

export const Dropdown: React.FunctionComponent<DropdownProps> = React.memo(
  ({
    name,
    canClear = true,
    canOpen = false,
    canCreate = false,
    selectMessage = "Please select...",
    searchMessage = "Search",
    noOptionsMessage = "No options",
    createMessage = "Create",
    options,
    value,
    onFocus = noop,
    onBlur = noop,
    onChangeValue,
    onOpen = noop,
    onCreate = noop,
  }) => {
    const containerElRef = React.useRef<HTMLInputElement>(null);
    const queryElRef = React.useRef<HTMLInputElement | null>(null);

    const [isContainerFocused, setContainerFocused] = React.useState(false);
    const [isQueryFocused, setQueryFocused] = React.useState(false);
    const isFocused = isContainerFocused || isQueryFocused;

    const [isMenuOpen, setMenuOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const [index, setIndex] = React.useState(0);

    const filteredOptions = React.useMemo(() => {
      if (query === "") {
        return options;
      }
      const lowerQuery = query.toLowerCase();
      return options.filter(
        ({ label, value }) =>
          label.toLowerCase().includes(lowerQuery) || value.toLowerCase().includes(lowerQuery),
      );
    }, [options, query]);

    const selectedOption = React.useMemo(
      () => options.find((option) => option.value === value),
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
      setMenuOpen(false);
    }, []);

    useOnClickOutside(containerElRef, onLeave);

    const scrollToOption = React.useCallback((index: number, smooth: boolean) => {
      window.requestAnimationFrame(() => {
        const { current: containerEl } = containerElRef;
        if (containerEl === null) {
          return;
        }
        const option = containerEl.querySelector(`.dfrm-dropdown__option:nth-child(${index + 1})`);
        if (option === null) {
          return;
        }
        scrollIntoView(option, smooth);
      });
    }, []);

    const onOpenMenu = React.useCallback(() => {
      setMenuOpen(true);
      setQuery("");
      let index = 0;
      if (value !== "") {
        index = filteredOptions.findIndex((option) => option.value === value);
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
      setMenuOpen(false);
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

    const onSelectOption = React.useCallback(
      (index: number) => {
        onChangeValue(filteredOptions[index].value);
        onCloseMenu();
      },
      [filteredOptions, onChangeValue, onCloseMenu],
    );

    const onClear = React.useCallback(() => {
      onChangeValue("");
    }, [onChangeValue]);

    const onClickOpen = React.useCallback(
      (event: React.MouseEvent) => {
        event.preventDefault();
        onOpen(value);
      },
      [onOpen, value],
    );

    const onClickClear = React.useCallback(
      (event: React.MouseEvent) => {
        event.preventDefault();
        onClear();
        if (!isFocused) {
          const { current: containerEl } = containerElRef;
          if (containerEl !== null) {
            containerEl.focus();
          }
        }
      },
      [isFocused, onClear],
    );

    const onClickCreate = React.useCallback(
      (event: React.MouseEvent) => {
        event.preventDefault();
        onCreate(query);
      },
      [onCreate, query],
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
            onSelectOption(index);
          }
        } else if (event.key === "Enter") {
          if (filteredOptions.length === 0) {
            if (canCreate) {
              onCreate(query);
            }
          } else {
            event.preventDefault();
            onSelectOption(index);
          }
        } else if (event.key === "Escape") {
          event.preventDefault();
          onCloseMenu();
        } else if (event.key === "Tab") {
          onLeave();
        }
      },
      [
        canCreate,
        query,
        index,
        filteredOptions,
        scrollToOption,
        onSelectOption,
        onCreate,
        onCloseMenu,
        onLeave,
      ],
    );

    return (
      <div
        ref={containerElRef}
        tabIndex={0}
        onFocus={onFocusContainer}
        onBlur={onBlurContainer}
        onKeyDown={onKeyDownContainer}
        className={cs("dfrm-dropdown", {
          "dfrm-dropdown--focused": isFocused,
          "dfrm-dropdown--open": isMenuOpen,
        })}
      >
        <div className="dfrm-dropdown__control">
          <div className="dfrm-dropdown__value-container" onMouseDown={onClickOpenMenu}>
            {selectedOption === undefined ? (
              <div className="dfrm-dropdown__placeholder">{selectMessage}</div>
            ) : (
              <div className="dfrm-dropdown__value">{selectedOption.label}</div>
            )}
          </div>
          <div className="dfrm-dropdown__button-container">
            {canOpen && (
              <button
                type="button"
                className="dfrm-dropdown__button"
                tabIndex={-1}
                disabled={selectedOption === undefined}
                onMouseDown={onClickOpen}
              >
                <MdOpenInNew />
              </button>
            )}
            <button
              type="button"
              className="dfrm-dropdown__button"
              tabIndex={-1}
              disabled={value === "" || !canClear}
              onMouseDown={onClickClear}
            >
              <MdClose />
            </button>
            <button
              type="button"
              className="dfrm-dropdown__button"
              tabIndex={-1}
              onMouseDown={onClickOpenMenu}
            >
              <MdExpandMore />
            </button>
          </div>
        </div>
        <div className="dfrm-dropdown__menu">
          <input
            ref={queryElRef}
            type="text"
            className="dfrm-dropdown__query"
            tabIndex={-1}
            placeholder={searchMessage}
            value={query}
            onFocus={onFocusQuery}
            onBlur={onBlurQuery}
            onChange={onChangeQuery}
            onKeyDown={onKeyDownQuery}
          />
          <div className="dfrm-dropdown__option-list">
            {filteredOptions.length === 0 ? (
              canCreate ? (
                <div className="dfrm-dropdown__create" onMouseDown={onClickCreate}>
                  {createMessage} "{query}"
                </div>
              ) : (
                <div className="dfrm-dropdown__no-options">{noOptionsMessage}</div>
              )
            ) : (
              filteredOptions.map((option, i) => (
                <DropdownOption
                  key={option.value || i}
                  isActive={index === i}
                  index={i}
                  onHover={onHoverOption}
                  onSelect={onSelectOption}
                >
                  {option.label}
                </DropdownOption>
              ))
            )}
          </div>
        </div>
      </div>
    );
  },
);

interface DropdownOptionProps {
  index: number;
  isActive: boolean;
  onHover(index: number): unknown;
  onSelect(index: number): unknown;
}

const DropdownOption: React.FunctionComponent<React.PropsWithChildren<DropdownOptionProps>> =
  React.memo(({ index, isActive, onHover, onSelect, children }) => {
    const onHoverInner = React.useCallback(() => {
      onHover(index);
    }, [onHover, index]);

    const onSelectInner = React.useCallback(
      (event: React.MouseEvent) => {
        event.preventDefault();
        onSelect(index);
      },
      [onSelect, index],
    );

    return (
      <div
        className={cs("dfrm-dropdown__option", {
          "dfrm-dropdown__option--active": isActive,
        })}
        onMouseOver={onHoverInner}
        onMouseDown={onSelectInner}
      >
        {children}
      </div>
    );
  });
