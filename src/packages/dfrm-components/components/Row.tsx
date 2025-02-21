import React from "react";
import "./Row.css";

export const Row: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => (
  <div className="dfrm-row">{children}</div>
);
