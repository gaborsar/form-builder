import React from "react";
import { TagReferenceMapContext } from "../contexts/TagReferenceMapContext";
import type { TagReferenceMap } from "../state/types";

export function useTagReferenceMap(): TagReferenceMap {
  return React.useContext(TagReferenceMapContext);
}
