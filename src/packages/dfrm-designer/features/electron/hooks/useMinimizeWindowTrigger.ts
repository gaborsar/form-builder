import { ipcRenderer } from "electron";
import React from "react";

export function useMinimizeWindowTrigger(): () => void {
  return React.useCallback(() => {
    ipcRenderer.send("app:minimize");
  }, []);
}
