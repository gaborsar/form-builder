import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./packages/dfrm-designer/features/app";

const container = document.getElementById("app");
if (container === null) {
  throw new Error();
}
const root = createRoot(container);
root.render(<App />);
