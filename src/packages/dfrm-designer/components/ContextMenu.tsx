import cs from "classnames";
import React from "react";
import { VscCheck } from "react-icons/vsc";
import "./ContextMenu.css";

interface ContextMenuProps {
  position: { top: number; left: number };
  onClose(): unknown;
}

export const ContextMenu: React.FunctionComponent<React.PropsWithChildren<ContextMenuProps>> =
  React.memo(({ position, onClose, children }) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const onCloseRef = React.useRef(onClose);

    const [style, setStyle] = React.useState(position);

    React.useEffect(() => {
      onCloseRef.current = onClose;
    }, [onClose]);

    React.useEffect(() => {
      const handler = ({ target }: MouseEvent) => {
        const { current: container } = containerRef;
        if (container === null || !(target instanceof Node)) {
          return;
        }
        if (!container.contains(target)) {
          onCloseRef.current();
        }
      };
      document.addEventListener("mousedown", handler);
      return () => {
        document.removeEventListener("mousedown", handler);
      };
    }, []);

    React.useEffect(() => {
      const { current: container } = containerRef;
      if (container === null) {
        setStyle(position);
      } else {
        const rect = container.getBoundingClientRect();
        setStyle({
          top: Math.min(position.top, window.innerHeight - rect.height - 10),
          left: position.left,
        });
      }
    }, [position]);

    return (
      <div ref={containerRef} className="app-context-menu" style={style} onClick={onClose}>
        {children}
      </div>
    );
  });

interface MenuItemProps {
  disabled?: boolean;
  icon?: React.ReactNode;
  text: React.ReactNode;
  onClick(): unknown;
}

export const MenuItem: React.FunctionComponent<MenuItemProps> = React.memo(
  ({ disabled = false, icon, text, onClick }) => (
    <div
      className={cs("app-context-menu__item", {
        "app-context-menu__item--disabled": disabled,
      })}
      onClick={onClick}
    >
      {icon && <div className="app-context-menu__item-icon">{icon}</div>}
      <div className="app-context-menu__item-text">{text}</div>
    </div>
  ),
);

export const ConfirmMenuItem: React.FunctionComponent<MenuItemProps> = React.memo(
  ({ disabled = false, icon, text, onClick }) => {
    const [isFirstClick, setFirstClick] = React.useState(true);

    const onClickInner = React.useCallback(
      (event: React.MouseEvent) => {
        if (isFirstClick) {
          setFirstClick(false);
          event.preventDefault();
          event.stopPropagation();
        } else {
          setFirstClick(true);
          onClick();
        }
      },
      [onClick, isFirstClick],
    );

    return (
      <div
        className={cs("app-context-menu__item", {
          "app-context-menu__item--disabled": disabled,
        })}
        onClick={onClickInner}
      >
        {isFirstClick ? (
          <>
            <div className="app-context-menu__item-icon">{icon}</div>
            <div className="app-context-menu__item-text">{text}</div>
          </>
        ) : (
          <>
            {" "}
            <div className="app-context-menu__item-icon">
              <VscCheck />
            </div>
            <div className="app-context-menu__item-text">Click to confirm</div>
          </>
        )}
      </div>
    );
  },
);

export const MenuItemSeparator: React.FunctionComponent = React.memo(() => (
  <hr className="app-context-menu__item-separator" />
));
