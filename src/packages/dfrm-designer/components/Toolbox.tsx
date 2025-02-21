import cs from "classnames";
import React from "react";
import "./Toolbox.css";

export const ToolboxContext = React.createContext<{
  tab: string;
  setTab(tab: string): void;
}>({
  tab: "",
  setTab() {},
});

interface ToolboxProps {
  tabs: React.ReactNode;
  body: React.ReactNode;
}

export const Toolbox: React.FunctionComponent<ToolboxProps> = React.memo(({ tabs, body }) => (
  <div className="app-toolbox">
    <div className="app-toolbox__tabs">{tabs}</div>
    <div className="app-toolbox__body">{body}</div>
  </div>
));

interface ToolboxTabProps {
  value: string;
}

export const ToolboxTab: React.FunctionComponent<React.PropsWithChildren<ToolboxTabProps>> =
  React.memo(({ value, children }) => {
    const { tab, setTab } = React.useContext(ToolboxContext);
    const onClick = React.useCallback(() => {
      setTab(value);
    }, [setTab, value]);
    return (
      <div
        className={cs("app-toolbox__tab", {
          "app-toolbox__tab--active": tab === value,
        })}
        onClick={onClick}
      >
        {children}
      </div>
    );
  });

interface ToolboxTabContentProps {
  value: string;
}

export const ToolboxTabContent: React.FunctionComponent<
  React.PropsWithChildren<ToolboxTabContentProps>
> = React.memo(({ value, children }) => {
  const { tab } = React.useContext(ToolboxContext);
  return (
    <div
      className={cs("app-toolbox__tab-content", {
        "app-toolbox__tab-content--active": tab === value,
      })}
    >
      {children}
    </div>
  );
});
