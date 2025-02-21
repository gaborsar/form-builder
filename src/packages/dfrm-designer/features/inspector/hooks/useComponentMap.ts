import React from "react";
import { ComponentMapContext } from "../contexts/ComponentMapContext";
import type { ComponentMap } from "../state/types";

export function useComponentMap(): ComponentMap {
  return React.useContext(ComponentMapContext);
}
