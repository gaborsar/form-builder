import { ipcRenderer } from "electron";
import React from "react";

export function useSaveProjectAsTrigger(): () => void {
  return React.useCallback(() => {
    ipcRenderer.send("app:saveAs");
  }, []);
}
