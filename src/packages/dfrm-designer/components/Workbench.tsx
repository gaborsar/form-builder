import cs from "classnames";
import React from "react";
import "./Workbench.css";

export const Workbench: React.FunctionComponent<React.PropsWithChildren> = React.memo(
  ({ children }) => <div className="app-workbench">{children}</div>,
);

export const WorkbenchBody: React.FunctionComponent<React.PropsWithChildren> = React.memo(
  ({ children }) => <div className="app-workbench__body">{children}</div>,
);

export const WorkbenchMenuBar: React.FunctionComponent<React.PropsWithChildren> = React.memo(
  ({ children }) => <div className="app-workbench__menu-bar">{children}</div>,
);

export const WorkbenchMenuBarLeft: React.FunctionComponent<React.PropsWithChildren> = React.memo(
  ({ children }) => <div className="app-workbench__menu-bar__left">{children}</div>,
);

export const WorkbenchMenuBarCenter: React.FunctionComponent<React.PropsWithChildren> = React.memo(
  ({ children }) => <div className="app-workbench__menu-bar__center">{children}</div>,
);

export const WorkbenchMenuBarRight: React.FunctionComponent<React.PropsWithChildren> = React.memo(
  ({ children }) => <div className="app-workbench__menu-bar__right">{children}</div>,
);

export const WorkbenchMainContent: React.FunctionComponent<React.PropsWithChildren> = React.memo(
  ({ children }) => <div className="app-workbench__main-content">{children}</div>,
);

interface WorkbenchEditorProps {
  isFocused: boolean;
  onFocus(): unknown;
}

export const WorkbenchEditor: React.FunctionComponent<
  React.PropsWithChildren<WorkbenchEditorProps>
> = React.memo(({ isFocused, onFocus, children }) => (
  <div
    className={cs("app-workbench__editor", {
      "app-workbench__editor--focused": isFocused,
    })}
    onFocus={onFocus}
    onMouseDown={onFocus}
  >
    {children}
  </div>
));

interface WorkbenchLeftPanelProps {
  isFocused: boolean;
  isOpen: boolean;
  width: number;
  onFocus(): unknown;
  onChangeWidth(width: number): unknown;
}

export const WorkbenchLeftPanel: React.FunctionComponent<
  React.PropsWithChildren<WorkbenchLeftPanelProps>
> = React.memo(({ isFocused, isOpen, width, onFocus, onChangeWidth, children }) => {
  useAdjustPanelWidthOnWindowResize(width, onChangeWidth);

  const [isResizing, setResizing] = React.useState(false);

  const onResizeStart = React.useCallback(
    (event: React.MouseEvent) => {
      if (event.target === null) {
        return;
      }
      setResizing(true);
      const rect = (event.target as HTMLDivElement).getBoundingClientRect();
      const resizeOffset = rect.x + rect.width - event.pageX + 1;
      const onResize = (event: MouseEvent) => {
        onChangeWidth(
          Math.min(Math.max(event.pageX + resizeOffset, getMinPanelWidth()), getMaxPanelWidth()),
        );
      };
      const onResizeEnd = () => {
        setResizing(false);
        window.removeEventListener("mousemove", onResize);
      };
      window.addEventListener("mousemove", onResize);
      window.addEventListener("mouseup", onResizeEnd, { once: true });
    },
    [onChangeWidth],
  );

  return (
    <div
      className={cs("app-workbench__panel", "app-workbench__panel--left", {
        "app-workbench__panel--focused": isFocused,
        "app-workbench__panel--open": isOpen,
        "app-workbench__panel--resizing": isResizing,
      })}
      style={{ width: `${width}px` }}
      onFocus={onFocus}
      onMouseDown={onFocus}
    >
      <div className="app-workbench__panel__content">{children}</div>
      <div className="app-workbench__panel__resize-handler" onMouseDown={onResizeStart} />
    </div>
  );
});

interface WorkbenchRightPanelProps {
  isFocused: boolean;
  isOpen: boolean;
  width: number;
  onFocus(): unknown;
  onChangeWidth(width: number): unknown;
}

export const WorkbenchRightPanel: React.FunctionComponent<
  React.PropsWithChildren<WorkbenchRightPanelProps>
> = React.memo(({ isFocused, isOpen, width, onFocus, onChangeWidth, children }) => {
  useAdjustPanelWidthOnWindowResize(width, onChangeWidth);

  const [isResizing, setResizing] = React.useState(false);

  const onResizeStart = React.useCallback(
    (event: React.MouseEvent) => {
      if (event.target === null) {
        return;
      }
      setResizing(true);
      const rect = (event.target as HTMLDivElement).getBoundingClientRect();
      const resizeOffset = event.pageX - rect.x - 1;
      const onResize = (event: MouseEvent) => {
        onChangeWidth(
          Math.min(
            Math.max(window.innerWidth - event.pageX + resizeOffset, getMinPanelWidth()),
            getMaxPanelWidth(),
          ),
        );
      };
      const onResizeEnd = () => {
        setResizing(false);
        window.removeEventListener("mousemove", onResize);
      };
      window.addEventListener("mousemove", onResize);
      window.addEventListener("mouseup", onResizeEnd, { once: true });
    },
    [onChangeWidth],
  );

  return (
    <div
      className={cs("app-workbench__panel", "app-workbench__panel--right", {
        "app-workbench__panel--focused": isFocused,
        "app-workbench__panel--open": isOpen,
        "app-workbench__panel--resizing": isResizing,
      })}
      style={{ width: `${width}px` }}
      onFocus={onFocus}
      onMouseDown={onFocus}
    >
      <div className="app-workbench__panel__content">{children}</div>
      <div className="app-workbench__panel__resize-handler" onMouseDown={onResizeStart} />
    </div>
  );
});

interface WorkbenchBottomPanelProps {
  isOpen: boolean;
  height: number;
  onFocus(): unknown;
  onChangeHeight(height: number): unknown;
}

export const WorkbenchBottomPanel: React.FunctionComponent<
  React.PropsWithChildren<WorkbenchBottomPanelProps>
> = React.memo(({ isOpen, height, onFocus, onChangeHeight, children }) => {
  useAdjustPanelHeightOnWindowResize(height, onChangeHeight);

  const [isResizing, setResizing] = React.useState(false);

  const onResizeStart = React.useCallback(
    (event: React.MouseEvent) => {
      if (event.target === null) {
        return;
      }
      setResizing(true);
      const rect = (event.target as HTMLDivElement).getBoundingClientRect();
      const resizeOffset = event.pageY - rect.y - 1;
      const onResize = (event: MouseEvent) => {
        onChangeHeight(
          Math.min(
            Math.max(window.innerHeight - event.pageY + resizeOffset, getMinPanelHeight()),
            getMaxPanelHeight(),
          ),
        );
      };
      const onResizeEnd = () => {
        setResizing(false);
        window.removeEventListener("mousemove", onResize);
      };
      window.addEventListener("mousemove", onResize);
      window.addEventListener("mouseup", onResizeEnd, { once: true });
    },
    [onChangeHeight],
  );

  return (
    <div
      className={cs("app-workbench__panel", "app-workbench__panel--bottom", {
        "app-workbench__panel--open": isOpen,
        "app-workbench__panel--resizing": isResizing,
      })}
      style={{ height: `${height}px` }}
      onFocus={onFocus}
      onMouseDown={onFocus}
    >
      <div className="app-workbench__panel__content">{children}</div>
      <div className="app-workbench__panel__resize-handler" onMouseDown={onResizeStart} />
    </div>
  );
});

function useAdjustPanelWidthOnWindowResize(
  width: number,
  onChangeWidth: (width: number) => unknown,
) {
  const widthRef = React.useRef(width);

  React.useEffect(() => {
    widthRef.current = width;
  }, [width]);

  React.useEffect(() => {
    const onResize = () => {
      const { current: width } = widthRef;
      const nextWidth = Math.min(Math.max(width, getMinPanelWidth()), getMaxPanelWidth());
      if (nextWidth === width) {
        return;
      }
      onChangeWidth(nextWidth);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onChangeWidth]);
}

function useAdjustPanelHeightOnWindowResize(
  height: number,
  onChangeheight: (height: number) => unknown,
) {
  const heightRef = React.useRef(height);

  React.useEffect(() => {
    heightRef.current = height;
  }, [height]);

  React.useEffect(() => {
    const onResize = () => {
      const { current: height } = heightRef;
      const nextHeight = Math.min(Math.max(height, getMinPanelHeight()), getMaxPanelHeight());
      if (nextHeight === height) {
        return;
      }
      onChangeheight(nextHeight);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onChangeheight]);
}

function getMinPanelWidth(): number {
  return 100;
}

function getMaxPanelWidth(): number {
  return (window.innerWidth - 400) / 2;
}

function getMinPanelHeight(): number {
  return 50;
}

function getMaxPanelHeight(): number {
  return window.innerHeight - 200;
}
