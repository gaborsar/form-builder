import cs from "classnames";
import React from "react";
import "./MenuBar.css";

interface MenuBarActionProps {
  title?: string;
  onClick(): unknown;
}

export const MenuBarAction: React.FunctionComponent<React.PropsWithChildren<MenuBarActionProps>> =
  React.memo(({ title, children, onClick }) => (
    <button type="button" className="app-menu-bar__action" title={title} onClick={onClick}>
      {children}
    </button>
  ));

interface MenuBarDropdownProps {
  label: React.ReactNode;
}

export const MenuBarDropdown: React.FunctionComponent<
  React.PropsWithChildren<MenuBarDropdownProps>
> = React.memo(({ label, children }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const [isOpen, setOpen] = React.useState(false);

  const onOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }
    const { current: containerEl } = containerRef;
    if (containerEl === null) {
      return;
    }
    const { current: menuEl } = menuRef;
    if (menuEl === null) {
      return;
    }
    const containerRect = containerEl.getBoundingClientRect();
    const menuRect = menuEl.getBoundingClientRect();
    menuEl.style.left = `${Math.max(Math.min(containerRect.left, window.innerWidth - menuRect.width - 5), 5)}px`;
  }, [isOpen]);

  React.useEffect(() => {
    const handler = ({ target }: MouseEvent) => {
      if (!(target instanceof Node)) {
        return;
      }
      const { current: containerEl } = containerRef;
      if (containerEl === null) {
        return;
      }
      if (!containerEl.contains(target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [onClose]);

  return (
    <div
      className={cs("app-menu-bar-dropdown", {
        "app-menu-bar-dropdown--open": isOpen,
      })}
      ref={containerRef}
    >
      <div className="app-menu-bar-dropdown__label" onClick={onOpen}>
        {label}
      </div>
      <div className="app-menu-bar-dropdown__menu" ref={menuRef} onClick={onClose}>
        {children}
      </div>
    </div>
  );
});

interface MenuBarDropdownItemProps {
  disabled?: boolean;
  icon?: React.ReactNode;
  text: React.ReactNode;
  shortcut?: React.ReactNode;
  onClick(): unknown;
}

export const MenuBarDropdownItem: React.FunctionComponent<
  React.PropsWithChildren<MenuBarDropdownItemProps>
> = React.memo(({ disabled = false, icon, text, shortcut, onClick }) => (
  <div
    className={cs("app-menu-bar-dropdown__item", {
      "app-menu-bar-dropdown__item--disabled": disabled,
    })}
    onClick={onClick}
  >
    <div className="app-menu-bar-dropdown__item__icon">{icon}</div>
    <div className="app-menu-bar-dropdown__item__text">{text}</div>
    <div className="app-menu-bar-dropdown__item__shortcut">{shortcut}</div>
  </div>
));

export const MenuBarDropdownItemSeparator: React.FunctionComponent = React.memo(() => (
  <hr className="app-menu-bar-dropdown__item-separator" />
));
