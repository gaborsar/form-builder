import { ipcRenderer } from "electron";
import React from "react";

export function useMaximizeWindowTrigger(): () => void {
  return React.useCallback(() => {
    ipcRenderer.send("app:maximize");
  }, []);
}
