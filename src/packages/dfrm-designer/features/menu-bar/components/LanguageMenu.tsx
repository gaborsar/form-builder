import React from "react";
import { VscCheck } from "react-icons/vsc";
import { MenuBarDropdown, MenuBarDropdownItem } from "../../../components/MenuBar";
import { Locale, useDispatch, useIntlState } from "../../../model";

const labels: { [key: string]: string } = {
  [Locale.English]: "English",
  [Locale.Hungarian]: "Hungarian",
};

export const LanguageMenu: React.FunctionComponent = React.memo(() => {
  const { locale } = useIntlState();
  const dispatch = useDispatch();
  const onSelect = React.useCallback(
    (value: string) => {
      dispatch({
        type: "intl__select-locale",
        payload: { locale: value as Locale },
      });
    },
    [dispatch],
  );
  return (
    <MenuBarDropdown label={labels[locale]}>
      <LanguageMenuItem
        isSelected={locale === Locale.English}
        value={Locale.English}
        onSelect={onSelect}
      />
      <LanguageMenuItem
        isSelected={locale === Locale.Hungarian}
        value={Locale.Hungarian}
        onSelect={onSelect}
      />
    </MenuBarDropdown>
  );
});

interface LanguageMenuItemProps {
  isSelected: boolean;
  value: string;
  onSelect(value: string): unknown;
}

const LanguageMenuItem: React.FunctionComponent<LanguageMenuItemProps> = React.memo(
  ({ isSelected, value, onSelect }) => {
    const onClick = React.useCallback(() => {
      onSelect(value);
    }, [onSelect, value]);
    return (
      <MenuBarDropdownItem
        icon={isSelected ? <VscCheck /> : null}
        text={labels[value]}
        onClick={onClick}
      />
    );
  },
);
