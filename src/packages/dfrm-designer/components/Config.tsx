import cs from "classnames";
import React from "react";
import "./Config.css";

export const ConfigContext = React.createContext<{
  tab: string;
  setTab(tab: string): unknown;
}>({
  tab: "",
  setTab() {},
});

interface ConfigProps {
  tabs?: React.ReactNode;
  content: React.ReactNode;
}

export const Config: React.FunctionComponent<React.PropsWithChildren<ConfigProps>> = React.memo(
  ({ tabs, content }) => (
    <div className="app-config">
      <div className="app-config__header">
        <div className="app-config__tabs">{tabs}</div>
      </div>
      <div className="app-config__body">{content}</div>
    </div>
  ),
);

interface ConfigTabProps {
  value: string;
}

export const ConfigTab: React.FunctionComponent<React.PropsWithChildren<ConfigTabProps>> =
  React.memo(({ value, children }) => {
    const { tab, setTab } = React.useContext(ConfigContext);
    const onClick = React.useCallback(() => {
      setTab(value);
    }, [setTab, value]);
    return (
      <div
        className={cs("app-config__tab", {
          "app-config__tab--active": tab === value,
        })}
        onClick={onClick}
      >
        {children}
      </div>
    );
  });

interface ConfigTabContentProps {
  value: string;
}

export const ConfigTabContent: React.FunctionComponent<
  React.PropsWithChildren<ConfigTabContentProps>
> = React.memo(({ value, children }) => {
  const { tab } = React.useContext(ConfigContext);
  return (
    <div
      className={cs("app-config__tab-content", {
        "app-config__tab-content--active": tab === value,
      })}
    >
      {children}
    </div>
  );
});
