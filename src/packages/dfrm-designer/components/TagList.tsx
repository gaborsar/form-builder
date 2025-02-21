import React from "react";
import "./TagList.css";

export const TagList: React.FunctionComponent<React.PropsWithChildren> = React.memo(
  ({ children }) => <div className="app-tag-list">{children}</div>,
);

export const TagListItem: React.FunctionComponent<React.PropsWithChildren> = React.memo(
  ({ children }) => <div className="app-tag-list__item">{children}</div>,
);
