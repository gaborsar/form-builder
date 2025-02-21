import cs from "classnames";
import React from "react";
import "./Column.css";

interface ColumnProps {
  width: number;
}

export const Column: React.FunctionComponent<React.PropsWithChildren<ColumnProps>> = React.memo(
  ({ width, children }) => (
    <div className={cs("dfrm-column", `dfrm-column--${width}`)}>{children}</div>
  ),
);
