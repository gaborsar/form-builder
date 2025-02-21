import React from "react";
import { ComponentReferenceMapContext } from "../contexts/ComponentReferenceMapContext";
import type { ComponentReferenceMap } from "../state/types";

export function useComponentReferenceMap(): ComponentReferenceMap {
  return React.useContext(ComponentReferenceMapContext);
}
