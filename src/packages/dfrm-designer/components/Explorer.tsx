import cs from "classnames";
import { SearchInput } from "dfrm-components";
import React from "react";
import "./Explorer.css";

export const ExplorerContext = React.createContext<{
  tab: string;
  setTab(tab: string): void;
}>({
  tab: "",
  setTab() {},
});

interface ExplorerProps {
  tabs: React.ReactNode;
  actions: React.ReactNode;
  search: React.ReactNode;
  content: React.ReactNode;
}

export const Explorer: React.FunctionComponent<ExplorerProps> = React.memo(
  ({ tabs, actions, search, content }) => (
    <div className="app-explorer">
      <div className="app-explorer__header">
        <div className="app-explorer__tabs">{tabs}</div>
        <div className="app-explorer__actions">{actions}</div>
      </div>
      <div className="app-explorer__search-bar">{search}</div>
      <div className="app-explorer__body">{content}</div>
    </div>
  ),
);

interface ExplorerTabProps {
  value: string;
}

export const ExplorerTab: React.FunctionComponent<React.PropsWithChildren<ExplorerTabProps>> =
  React.memo(({ value, children }) => {
    const { tab, setTab } = React.useContext(ExplorerContext);
    const onClick = React.useCallback(() => {
      setTab(value);
    }, [setTab, value]);
    return (
      <div
        className={cs("app-explorer__tab", {
          "app-explorer__tab--active": tab === value,
        })}
        onClick={onClick}
      >
        {children}
      </div>
    );
  });

interface ExplorerTabActionsProps {
  value: string;
}

export const ExplorerTabActions: React.FunctionComponent<
  React.PropsWithChildren<ExplorerTabActionsProps>
> = React.memo(({ value, children }) => {
  const { tab } = React.useContext(ExplorerContext);
  return tab === value ? <>{children}</> : null;
});

interface ExplorerTabSearchProps {
  value: string;
}

export const ExplorerTabSearch: React.FunctionComponent<
  React.PropsWithChildren<ExplorerTabSearchProps>
> = React.memo(({ value, children }) => {
  const { tab } = React.useContext(ExplorerContext);
  return tab === value ? <>{children}</> : null;
});

interface ExplorerSearchInputProps {
  query: string;
  onChangeQuery(query: string): unknown;
}

export const ExplorerSearchInput: React.FunctionComponent<ExplorerSearchInputProps> = React.memo(
  ({ query, onChangeQuery }) => (
    <SearchInput
      name="explorer-query"
      placeholder="Search..."
      value={query}
      onChangeValue={onChangeQuery}
    />
  ),
);

interface ExplorerTabContentProps {
  value: string;
}

export const ExplorerTabContent: React.FunctionComponent<
  React.PropsWithChildren<ExplorerTabContentProps>
> = React.memo(({ value, children }) => {
  const { tab } = React.useContext(ExplorerContext);
  return (
    <div
      className={cs("app-explorer__tab-content", {
        "app-explorer__tab-content--active": tab === value,
      })}
    >
      {children}
    </div>
  );
});

interface ExplorerButtonProps {
  title?: string;
  onClick(): unknown;
}

export const ExplorerButton: React.FunctionComponent<React.PropsWithChildren<ExplorerButtonProps>> =
  React.memo(({ title, onClick, children }) => (
    <button type="button" className="app-explorer__button" title={title} onClick={onClick}>
      {children}
    </button>
  ));
