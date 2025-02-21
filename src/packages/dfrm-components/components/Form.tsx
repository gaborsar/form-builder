import React from "react";
import "./Form.css";

export const Form: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => (
  <div className="dfrm-form">{children}</div>
);

export const FormBody: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => (
  <div className="dfrm-form__body">{children}</div>
);

export const FormFooter: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => (
  <div className="dfrm-form__footer">{children}</div>
);
