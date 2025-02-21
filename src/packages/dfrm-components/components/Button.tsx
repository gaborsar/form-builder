import React from "react";
import "./Button.css";

interface ButtonProps {
  disabled?: boolean;
  onClick(): unknown;
}

export const Button: React.FunctionComponent<React.PropsWithChildren<ButtonProps>> = React.memo(
  ({ disabled, onClick, children }) => (
    <button type="button" className="dfrm-button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  ),
);
