import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { configureStore } from "@reduxjs/toolkit";
import { CURRENT_MODEL_VERSION, emptyState } from "./constants";
import { reducer } from "./reducer";
import type { State } from "./state";

const CACHE_FILE_PATH = "cache.json";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  reducer,
  preloadedState: readStateFromCacheFile(),
});

window.addEventListener(
  "unload",
  () => {
    writeStateToCacheFile(store.getState());
  },
  { once: true },
);

function readStateFromCacheFile(): State {
  if (!existsSync(CACHE_FILE_PATH)) {
    return emptyState;
  }
  const data = JSON.parse(readFileSync(CACHE_FILE_PATH).toString("utf-8"));
  if (data.version !== CURRENT_MODEL_VERSION) {
    return emptyState;
  }
  return data;
}

export function writeStateToCacheFile(state: State): void {
  writeFileSync(CACHE_FILE_PATH, JSON.stringify(state));
}
