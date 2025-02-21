import cs from "classnames";
import React from "react";
import { VscClose } from "react-icons/vsc";
import { ContextMenu, MenuItem } from "./ContextMenu";
import "./Editor.css";

const DndContext = React.createContext<{
  source: number;
  target: number;
  setSource(value: number): void;
  setTarget(value: number): void;
}>({
  source: -1,
  target: -1,
  setSource() {},
  setTarget() {},
});

export const Editor: React.FunctionComponent<React.PropsWithChildren> = React.memo(
  ({ children }) => <div className="app-editor">{children}</div>,
);

export const EditorTabs: React.FunctionComponent<React.PropsWithChildren> = React.memo(
  ({ children }) => {
    const ref = React.useRef<HTMLDivElement | null>(null);

    const [source, setSource] = React.useState(-1);
    const [target, setTarget] = React.useState(-1);

    React.useEffect(() => {
      const { current: el } = ref;
      if (el === null) {
        return;
      }
      const handler = (event: WheelEvent) => {
        event.preventDefault();
        if (!(event.target instanceof HTMLElement)) {
          return;
        }
        el.scrollLeft += event.deltaY;
      };
      el.addEventListener("wheel", handler, { passive: false });
      return () => {
        el.removeEventListener("wheel", handler);
      };
    }, []);

    return (
      <div ref={ref} className="app-editor__tabs">
        <DndContext.Provider value={{ source, target, setSource, setTarget }}>
          {children}
        </DndContext.Provider>
      </div>
    );
  },
);

interface EditorTabProps {
  isActive: boolean;
  index: number;
  icon: React.ReactNode;
  onSelect(index: number): unknown;
  onMove(source: number, target: number): unknown;
  onClose(index: number): unknown;
  onCloseOthers(index: number): unknown;
  onCloseAll(): unknown;
  onCloseToTheRight(index: number): unknown;
  onRevealInExplorer(index: number): unknown;
}

export const EditorTab: React.FunctionComponent<React.PropsWithChildren<EditorTabProps>> =
  React.memo(
    ({
      isActive,
      index,
      icon,
      onSelect,
      onMove,
      onClose,
      onCloseOthers,
      onCloseAll,
      onCloseToTheRight,
      onRevealInExplorer,
      children,
    }) => {
      const ref = React.useRef<HTMLDivElement | null>(null);

      const { source, target, setSource, setTarget } = React.useContext(DndContext);

      const [isMenuOpen, setMenuOpen] = React.useState(false);
      const [menuPosition, setMenuPosition] = React.useState({
        top: 0,
        left: 0,
      });

      React.useEffect(() => {
        if (isActive && ref.current !== null) {
          ref.current.scrollIntoView();
        }
      }, [isActive]);

      const onDragStart = React.useCallback(
        (event: React.DragEvent) => {
          event.stopPropagation();
          onSelect(index);
          setSource(index);
        },
        [onSelect, setSource, index],
      );

      const onDragEnd = React.useCallback(
        (event: React.DragEvent) => {
          event.stopPropagation();
          setSource(-1);
          setTarget(-1);
        },
        [setSource, setTarget],
      );

      const onDragOver = React.useCallback(
        (event: React.DragEvent) => {
          if (source === -1 || source === index) {
            return;
          }
          event.preventDefault();
          event.stopPropagation();
          setTarget(index);
        },
        [setTarget, source, index],
      );

      const onDrop = React.useCallback(
        (event: React.DragEvent) => {
          event.stopPropagation();
          setSource(-1);
          setTarget(-1);
          if (source === -1 || target === -1) {
            return;
          }
          onMove(source, target);
        },
        [onMove, setSource, setTarget, source, target],
      );

      const onSelectInner = React.useCallback(() => {
        onSelect(index);
      }, [onSelect, index]);

      const onCloseInner = React.useCallback(() => {
        onClose(index);
      }, [onClose, index]);

      const onCloseOthersInner = React.useCallback(() => {
        onCloseOthers(index);
      }, [onCloseOthers, index]);

      const onCloseToTheRightInner = React.useCallback(() => {
        onCloseToTheRight(index);
      }, [onCloseToTheRight, index]);

      const onRevealInExplorerInner = React.useCallback(() => {
        onRevealInExplorer(index);
      }, [onRevealInExplorer, index]);

      const onMouseDownCloseButton = React.useCallback((event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
      }, []);

      const onClickCloseButton = React.useCallback(
        (event: React.MouseEvent) => {
          event.stopPropagation();
          onCloseInner();
        },
        [onCloseInner],
      );

      const onOpenContextMenu = React.useCallback((event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setMenuOpen(true);
        setMenuPosition({
          left: event.clientX,
          top: event.clientY,
        });
      }, []);

      const onCloseContextMenu = React.useCallback(() => {
        setMenuOpen(false);
      }, []);

      return (
        <>
          <div
            ref={ref}
            draggable={true}
            className={cs("app-editor__tab", {
              "app-editor__tab--active": isActive,
              "app-editor__tab--dnd-target": target === index,
            })}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onClick={onSelectInner}
            onContextMenu={onOpenContextMenu}
          >
            <div className="app-editor__tab__icon">{icon}</div>
            <div className="app-editor__tab__text">{children}</div>
            <button
              onDragStart={(event) => {
                event.stopPropagation();
                event.preventDefault();
              }}
              type="button"
              className="app-editor__tab__button"
              onMouseDown={onMouseDownCloseButton}
              onClick={onClickCloseButton}
            >
              <VscClose />
            </button>
          </div>
          {isMenuOpen && (
            <ContextMenu position={menuPosition} onClose={onCloseContextMenu}>
              <MenuItem text="Close" onClick={onCloseInner} />
              <MenuItem text="Close others" onClick={onCloseOthersInner} />
              <MenuItem text="Close all" onClick={onCloseAll} />
              <MenuItem text="Close to the right" onClick={onCloseToTheRightInner} />
              <MenuItem text="Reveal in explorer" onClick={onRevealInExplorerInner} />
            </ContextMenu>
          )}
        </>
      );
    },
  );

interface EditorContentProps {
  isActive: boolean;
}

export const EditorContent: React.FunctionComponent<React.PropsWithChildren<EditorContentProps>> =
  React.memo(({ isActive, children }) => (
    <div
      className={cs("app-editor__content", {
        "app-editor__content--active": isActive,
      })}
    >
      <div className="app-editor__content__outer-wrapper">
        <div className="app-editor__content__inner-wrapper">{children}</div>
      </div>
    </div>
  ));

export const EditorBreadcrumbs: React.FunctionComponent<React.PropsWithChildren> = React.memo(
  ({ children }) => <div className="app-editor__breadcrumbs">{children}</div>,
);
