import React from "react";
import "./ReferenceList.css";

export const ReferenceList: React.FunctionComponent<React.PropsWithChildren> = React.memo(
  ({ children }) => <div className="reference-list">{children}</div>,
);

interface ReferenceListItemProps {
  onClick(): unknown;
}

export const ReferenceListItem: React.FunctionComponent<
  React.PropsWithChildren<ReferenceListItemProps>
> = React.memo(({ onClick, children }) => (
  <div className="reference-list__item" onClick={onClick}>
    {children}
  </div>
));
