import { ipcRenderer } from "electron";
import React from "react";

export function useCloseWindowTrigger(): () => void {
  return React.useCallback(() => {
    ipcRenderer.send("app:close");
  }, []);
}
