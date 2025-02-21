import cs from "classnames";
import { PhoneNumberFormat, PhoneNumberUtil } from "google-libphonenumber";
import { getName as getCountryName } from "i18n-iso-countries";
import React from "react";
import ReactCountryFlag from "react-country-flag";
import { MdExpandMore } from "react-icons/md";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { scrollIntoView } from "../utils/scrollIntoView";
import { DebouncedInput } from "./DebouncedInput";
import "./PhoneNumber.css";

const phoneNumberUtil = PhoneNumberUtil.getInstance();
const supportedRegions = phoneNumberUtil.getSupportedRegions();

interface PhoneNumberProps {
  disabled?: boolean;
  autoFocus?: boolean;
  name: string;
  locale: string;
  searchMessage?: string;
  defaultRegion?: string;
  value: string;
  noOptionsMessage?: string;
  onFocus?(): unknown;
  onBlur?(): unknown;
  onChangeValue(value: string): unknown;
}

export const PhoneNumber: React.FunctionComponent<PhoneNumberProps> = React.memo(
  ({ defaultRegion = "HU", value, onChangeValue, ...props }) => {
    const [prevCountryCode, setPrevCountryCode] = React.useState(0);

    const [countryCode, nationalNumber] = React.useMemo(
      () => splitValue(value, defaultRegion, prevCountryCode),
      [value, defaultRegion, prevCountryCode],
    );

    const onChangeCountryCode = React.useCallback(
      (countryCode: number) => {
        setPrevCountryCode(countryCode);
        onChangeValue(joinValue(countryCode, nationalNumber));
      },
      [onChangeValue, nationalNumber],
    );

    const onChangeNationalNumber = React.useCallback(
      (nationalNumber: string) => {
        onChangeValue(joinValue(countryCode, nationalNumber));
      },
      [onChangeValue, countryCode],
    );

    return (
      <SplitPhoneNumber
        {...props}
        countryCode={countryCode}
        nationalNumber={nationalNumber}
        onChangeCountryCode={onChangeCountryCode}
        onChangeNationalNumber={onChangeNationalNumber}
      />
    );
  },
);

interface SplitPhoneNumberProps {
  disabled?: boolean;
  autoFocus?: boolean;
  name: string;
  locale: string;
  searchMessage?: string;
  countryCode: number;
  nationalNumber: string;
  noOptionsMessage?: string;
  onFocus?(): unknown;
  onBlur?(): unknown;
  onChangeCountryCode(value: number): unknown;
  onChangeNationalNumber(value: string): unknown;
}

const noop = () => {};

const SplitPhoneNumber: React.FunctionComponent<SplitPhoneNumberProps> = React.memo(
  ({
    disabled,
    autoFocus,
    name,
    locale = "en",
    searchMessage,
    noOptionsMessage,
    countryCode,
    nationalNumber,
    onFocus = noop,
    onBlur = noop,
    onChangeCountryCode,
    onChangeNationalNumber,
  }) => {
    const containerElRef = React.useRef<HTMLInputElement>(null);
    const queryElRef = React.useRef<HTMLInputElement | null>(null);
    const inputElRef = React.useRef<HTMLInputElement | null>(null);

    const [isInputFocused, setInputFocused] = React.useState(false);
    const [isQueryFocused, setQueryFocused] = React.useState(false);
    const isFocused = isInputFocused || isQueryFocused;

    const [isMenuOpen, setMenuOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const [index, setIndex] = React.useState(0);

    const options: { label: string; value: string }[] = React.useMemo(() => {
      const options: { label: string; value: string }[] = [];
      for (const code of supportedRegions) {
        const label = getCountryName(code, locale);
        if (!!code && !!label) {
          options.push({ label, value: code });
        }
      }
      return options;
    }, [locale]);

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

    const selectedRegion = React.useMemo(
      () => phoneNumberUtil.getRegionCodeForCountryCode(countryCode),
      [countryCode],
    );

    React.useEffect(() => {
      setIndex((index) => Math.max(Math.min(index, filteredOptions.length - 1), 0));
    }, [filteredOptions]);

    const onFocusInput = React.useCallback(() => {
      setInputFocused(true);
      onFocus();
    }, [onFocus]);

    const onBlurInput = React.useCallback(() => {
      setInputFocused(false);
      onBlur();
    }, [onBlur]);

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
        const option = containerEl.querySelector(
          `.dfrm-phone-number__option:nth-child(${index + 1})`,
        );
        if (option === null) {
          return;
        }
        scrollIntoView(option, smooth);
      });
    }, []);

    const onOpenMenu = React.useCallback(() => {
      setMenuOpen(true);
      setQuery("");
      const index = filteredOptions.findIndex(({ value }) => value === selectedRegion);
      setIndex(index);
      window.requestAnimationFrame(() => {
        const { current: queryEl } = queryElRef;
        if (queryEl !== null) {
          queryEl.focus();
        }
        scrollToOption(index, false);
      });
    }, [selectedRegion, filteredOptions, scrollToOption]);

    const onCloseMenu = React.useCallback(() => {
      setMenuOpen(false);
      window.requestAnimationFrame(() => {
        const { current: inputEl } = inputElRef;
        if (inputEl !== null) {
          inputEl.focus();
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
        const { value } = filteredOptions[index];
        onChangeCountryCode(phoneNumberUtil.getCountryCodeForRegion(value));
        onCloseMenu();
      },
      [filteredOptions, onChangeCountryCode, onCloseMenu],
    );

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
          if (filteredOptions.length !== 0) {
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
      [query, index, filteredOptions, scrollToOption, onSelectOption, onCloseMenu, onLeave],
    );

    const onChangeQuery = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    }, []);

    return (
      <div
        ref={containerElRef}
        className={cs("dfrm-phone-number", {
          "dfrm-phone-number--disabled": disabled,
          "dfrm-phone-number--focused": isFocused,
          "dfrm-phone-number--open": isMenuOpen,
        })}
      >
        <div className="dfrm-phone-number__control">
          <button
            type="button"
            tabIndex={-1}
            className="dfrm-phone-number__country-toggle"
            onMouseDown={onClickOpenMenu}
          >
            <ReactCountryFlag svg={true} countryCode={selectedRegion} />
            <MdExpandMore />
          </button>
          <div className="dfrm-phone-number__country-code">+{countryCode}</div>
          <DebouncedInput
            ref={inputElRef}
            type="text"
            disabled={disabled}
            autoFocus={autoFocus}
            id={name}
            value={nationalNumber}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
            onChangeValue={onChangeNationalNumber}
          />
        </div>
        <div className="dfrm-phone-number__menu">
          <input
            ref={queryElRef}
            type="text"
            className="dfrm-phone-number__query"
            tabIndex={-1}
            placeholder={searchMessage}
            value={query}
            onFocus={onFocusQuery}
            onBlur={onBlurQuery}
            onKeyDown={onKeyDownQuery}
            onChange={onChangeQuery}
          />
          <div className="dfrm-phone-number__option-list">
            {filteredOptions.length === 0 ? (
              <div className="dfrm-phone-number__no-options">{noOptionsMessage}</div>
            ) : (
              filteredOptions.map(({ label, value }, i) => (
                <Option
                  key={value || i}
                  isActive={index === i}
                  index={i}
                  value={value}
                  label={label}
                  onHover={onHoverOption}
                  onSelect={onSelectOption}
                />
              ))
            )}
          </div>
        </div>
      </div>
    );
  },
);

interface OptionProps {
  isActive: boolean;
  index: number;
  value: string;
  label: string;
  onHover(index: number): unknown;
  onSelect(index: number): unknown;
}

const Option: React.FunctionComponent<OptionProps> = React.memo(
  ({ isActive, index, value, label, onHover, onSelect }) => {
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
        className={cs("dfrm-phone-number__option", {
          "dfrm-phone-number__option--active": isActive,
        })}
        onMouseOver={onHoverInner}
        onMouseDown={onSelectInner}
      >
        <div className="dfrm-phone-number__option__icon">
          <ReactCountryFlag svg={true} countryCode={value} />
        </div>
        <div className="dfrm-phone-number__option__text">{label}</div>
      </div>
    );
  },
);

function splitValue(
  value: string,
  defaultRegion: string,
  prevCountryCode: number,
): readonly [number, string] {
  let defaultCountryCode: number;
  if (prevCountryCode === 0) {
    defaultCountryCode = phoneNumberUtil.getCountryCodeForRegion(defaultRegion);
  } else {
    defaultCountryCode = prevCountryCode;
  }

  if (value === "") {
    return [defaultCountryCode, ""];
  }

  let countryCode: number | undefined = undefined;
  let nationalNumber = "";

  // extract country code from a valid phone number
  try {
    const phoneNumber = phoneNumberUtil.parse(value.replace(/[0-9+]/g, "").trim());
    countryCode = phoneNumber.getCountryCode();
    nationalNumber = value.replace(new RegExp(`^\\+?${countryCode}`), "").trim();
  } catch (e) {}

  // guess country code with a pattern
  if (countryCode === undefined) {
    const matches = value.match(/^\+(\d+)/);
    if (matches !== null) {
      countryCode = Number.parseInt(matches[1], 10);
    }
    nationalNumber = value.replace(new RegExp(`^\\+?${countryCode}`), "").trim();
  }

  // use default country code
  if (countryCode === undefined) {
    countryCode = defaultCountryCode;
    nationalNumber = value.replace(new RegExp(`^\\+?${countryCode}`), "").trim();
  }

  return [countryCode, nationalNumber];
}

function joinValue(countryCode: number, nationalNumber: string): string {
  if (nationalNumber === "") {
    return "";
  }
  let value = `+${countryCode} ${nationalNumber}`;
  try {
    const phoneNumber = phoneNumberUtil.parse(value);
    value = phoneNumberUtil.format(phoneNumber, PhoneNumberFormat.INTERNATIONAL);
  } catch (e) {}
  return value;
}
