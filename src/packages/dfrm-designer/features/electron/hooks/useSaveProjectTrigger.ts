import { ipcRenderer } from "electron";
import React from "react";
import { useEditStackItem } from "../../../model";

export function useSaveProjectTrigger(): () => void {
  const { filename } = useEditStackItem();

  const filenameRef = React.useRef(filename);
  React.useEffect(() => {
    filenameRef.current = filename;
  }, [filename]);

  return React.useCallback(() => {
    if (filenameRef.current === "") {
      ipcRenderer.send("app:saveAs");
    } else {
      ipcRenderer.send("app:save", filenameRef.current);
    }
  }, []);
}
