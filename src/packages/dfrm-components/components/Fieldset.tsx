import React from "react";
import "./Fieldset.css";

export const Fieldset: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => (
  <div className="dfrm-fieldset">{children}</div>
);

export const FieldsetLabel: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => (
  <div className="dfrm-fieldset__label">{children}</div>
);
