import React from "react";
import "./Field.css";

export const Field: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => (
  <div className="dfrm-field">{children}</div>
);
