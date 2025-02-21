import React from "react";
import "./ValidationError.css";

interface ValidationErrorProps {
  content?: string;
}

export const ValidationError: React.FunctionComponent<ValidationErrorProps> = ({
  content = "",
}) => (
  <div className="dfrm-validation-error" title={content}>
    {content}
  </div>
);
