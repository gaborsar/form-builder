import React from "react";
import "./Json.css";

interface JsonProps {
  value: unknown;
}

export const Json: React.FunctionComponent<JsonProps> = React.memo(({ value }) => (
  <div className="json">
    <pre>{JSON.stringify(value, null, 2) || "undefined"}</pre>
  </div>
));
