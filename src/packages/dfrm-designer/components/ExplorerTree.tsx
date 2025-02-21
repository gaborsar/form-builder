import cs from "classnames";
import React from "react";
import { VscChevronDown, VscChevronRight, VscEllipsis } from "react-icons/vsc";
import { ContextMenu } from "./ContextMenu";
import "./ExplorerTree.css";

interface ExplorerTreeProps {
  menu?: React.ReactNode;
}

export const ExplorerTree: React.FunctionComponent<React.PropsWithChildren<ExplorerTreeProps>> =
  React.memo(({ menu, children }) => {
    const [isMenuOpen, setMenuOpen] = React.useState(false);
    const [menuPosition, setMenuPosition] = React.useState({ top: 0, left: 0 });
    return (
      <>
        <div
          className="app-explorer-tree"
          onContextMenu={(event) => {
            event.preventDefault();
            event.stopPropagation();
            if (menu) {
              setMenuOpen(true);
              setMenuPosition({
                left: event.clientX,
                top: event.clientY,
              });
            }
          }}
        >
          {children}
        </div>
        {menu && isMenuOpen && (
          <ContextMenu
            position={menuPosition}
            onClose={() => {
              setMenuOpen(false);
            }}
          >
            {menu}
          </ContextMenu>
        )}
      </>
    );
  });

interface DndProps {
  isDraggable?: boolean;
  isDndContainer?: boolean;
  isDndSource?: boolean;
  isDndTarget?: boolean;
  dndMode?: string | null;
  onDragStart?(event: React.DragEvent): unknown;
  onDragEnd?(event: React.DragEvent): unknown;
  onDragOver?(event: React.DragEvent): unknown;
  onDrop?(event: React.DragEvent): unknown;
}

interface ExplorerTreeParentNodeProps extends DndProps {
  level: number;
  isSelected: boolean;
  isVisible: boolean;
  isOpen: boolean;
  label: React.ReactNode;
  actions?: React.ReactNode;
  menu?: React.ReactNode;
  onSelect(): unknown;
  onToggle(): unknown;
}

export const ExplorerTreeParentNode: React.FunctionComponent<
  React.PropsWithChildren<ExplorerTreeParentNodeProps>
> = React.memo(
  ({
    level,
    isDraggable,
    isDndContainer,
    isDndSource,
    isDndTarget,
    dndMode,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDrop,
    isSelected,
    isVisible,
    isOpen,
    label,
    actions,
    menu,
    onSelect,
    onToggle,
    children,
  }) => {
    const [isMenuOpen, setMenuOpen] = React.useState(false);
    const [menuPosition, setMenuPosition] = React.useState({
      top: 0,
      left: 0,
    });
    return (
      <div
        className={cs(
          "app-explorer-tree__node",
          {
            "app-explorer-tree__node--selected": isSelected,
            "app-explorer-tree__node--visible": isVisible,
            "app-explorer-tree__node--open": isOpen,
            "app-explorer-tree__node--dnd-container": isDndContainer,
            "app-explorer-tree__node--dnd-source": isDndSource,
            "app-explorer-tree__node--dnd-target": isDndTarget,
          },
          dndMode ? `app-explorer-tree__node--dnd-${dndMode}` : "",
        )}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <div className="app-explorer-tree__node__dnd-marker app-explorer-tree__node__dnd-marker--top" />
        <div
          className="app-explorer-tree__node__content"
          style={{ paddingLeft: `${level * 20 + 5}px` }}
          draggable={isDraggable}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onMouseDown={onSelect}
          onContextMenu={(event) => {
            event.preventDefault();
            event.stopPropagation();
            if (menu) {
              setMenuOpen(true);
              setMenuPosition({
                left: event.clientX,
                top: event.clientY,
              });
            }
          }}
        >
          <button
            tabIndex={-1}
            type="button"
            className="app-explorer-tree__node__toggle-button"
            onClick={onToggle}
          >
            {isOpen ? <VscChevronDown /> : <VscChevronRight />}
          </button>
          <div className="app-explorer-tree__node__label">
            <div className="app-explorer-tree__node__text">{label}</div>
          </div>
          {actions}
          {menu && (
            <ExplorerNodeButton
              title="More Actions..."
              onClick={(event) => {
                event.stopPropagation();
                setMenuOpen(true);
                const rect = event.currentTarget.getBoundingClientRect();
                setMenuPosition({
                  left: rect.left + rect.width + 10,
                  top: rect.top + rect.height / 2 - 20,
                });
              }}
            >
              <VscEllipsis />
            </ExplorerNodeButton>
          )}
        </div>
        {children && <div className="app-explorer-tree__node__children">{children}</div>}
        <div className="app-explorer-tree__node__dnd-marker app-explorer-tree__node__dnd-marker--bottom" />
        {menu && isMenuOpen && (
          <ContextMenu
            position={menuPosition}
            onClose={() => {
              setMenuOpen(false);
            }}
          >
            {menu}
          </ContextMenu>
        )}
      </div>
    );
  },
);

interface ExplorerTreeLeafNodeProps extends DndProps {
  level: number;
  isSelected: boolean;
  isVisible: boolean;
  label: React.ReactNode;
  actions?: React.ReactNode;
  menu?: React.ReactNode;
  onSelect(): unknown;
  onOpen?(): unknown;
}

const noop = () => {};

export const ExplorerTreeLeafNode: React.FunctionComponent<ExplorerTreeLeafNodeProps> = React.memo(
  ({
    level,
    isDraggable,
    isDndSource,
    isDndTarget,
    dndMode,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDrop,
    isSelected,
    isVisible,
    label,
    actions,
    menu,
    onSelect,
    onOpen = noop,
  }) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const clickCountRef = React.useRef(0);
    const clickTimeoutRef = React.useRef(0);

    const [isMenuOpen, setMenuOpen] = React.useState(false);
    const [menuPosition, setMenuPosition] = React.useState({
      top: 0,
      left: 0,
    });

    const onMouseDown = React.useCallback(
      (event: React.MouseEvent) => {
        if (event.button !== 0) {
          return;
        }
        if (clickCountRef.current === 0) {
          clickCountRef.current = 1;
          clickTimeoutRef.current = window.setTimeout(() => {
            clickCountRef.current = 0;
          }, 300);
          onSelect();
        } else {
          clickCountRef.current = 0;
          window.clearTimeout(clickTimeoutRef.current);
          onOpen();
        }
      },
      [onSelect, onOpen],
    );

    React.useEffect(() => {
      if (isSelected && containerRef.current !== null) {
        containerRef.current.scrollIntoView();
      }
    }, [isSelected]);

    return (
      <div
        ref={containerRef}
        className={cs(
          "app-explorer-tree__node",
          {
            "app-explorer-tree__node--selected": isSelected,
            "app-explorer-tree__node--visible": isVisible,
            "app-explorer-tree__node--dnd-source": isDndSource,
            "app-explorer-tree__node--dnd-target": isDndTarget,
          },
          dndMode ? `app-explorer-tree__node--dnd-${dndMode}` : "",
        )}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <div className="app-explorer-tree__node__dnd-marker app-explorer-tree__node__dnd-marker--top" />
        <div
          className="app-explorer-tree__node__content"
          style={{ paddingLeft: `${level * 20 + 15}px` }}
          draggable={isDraggable}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onMouseDown={onMouseDown}
          onContextMenu={(event) => {
            event.preventDefault();
            event.stopPropagation();
            if (menu) {
              setMenuOpen(true);
              setMenuPosition({
                left: event.clientX,
                top: event.clientY,
              });
            }
          }}
        >
          <div className="app-explorer-tree__node__dnd-marker app-explorer-tree__node__dnd-marker--replace" />
          <div className="app-explorer-tree__node__label">
            <div className="app-explorer-tree__node__text">{label}</div>
          </div>
          {actions}
          {menu && (
            <ExplorerNodeButton
              title="More Actions..."
              onClick={(event) => {
                event.stopPropagation();
                setMenuOpen(true);
                const rect = event.currentTarget.getBoundingClientRect();
                setMenuPosition({
                  left: rect.left + rect.width + 10,
                  top: rect.top + rect.height / 2 - 20,
                });
              }}
            >
              <VscEllipsis />
            </ExplorerNodeButton>
          )}
        </div>
        <div className="app-explorer-tree__node__dnd-marker app-explorer-tree__node__dnd-marker--bottom" />
        {menu && isMenuOpen && (
          <ContextMenu
            position={menuPosition}
            onClose={() => {
              setMenuOpen(false);
            }}
          >
            {menu}
          </ContextMenu>
        )}
      </div>
    );
  },
);

interface ExplorerNodeButtonProps {
  title: string;
  onClick(event: React.MouseEvent): unknown;
}

export const ExplorerNodeButton: React.FunctionComponent<
  React.PropsWithChildren<ExplorerNodeButtonProps>
> = React.memo(({ title, onClick, children }) => (
  <button
    tabIndex={-1}
    type="button"
    className="app-explorer-tree__node__button"
    title={title}
    onClick={onClick}
  >
    {children}
  </button>
));
