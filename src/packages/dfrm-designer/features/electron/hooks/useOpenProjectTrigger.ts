import { ipcRenderer } from "electron";
import React from "react";

export function useOpenProjectTrigger(): () => void {
  return React.useCallback(() => {
    ipcRenderer.send("app:open");
  }, []);
}
