import React from "react";
import { TagMapContext } from "../contexts/TagMapContext";
import type { TagMap } from "../state/types";

export function useTagMap(): TagMap {
  return React.useContext(TagMapContext);
}
