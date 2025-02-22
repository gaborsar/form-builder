import { writeFile } from "node:fs/promises";
import { ipcRenderer } from "electron";
import React from "react";
import { convertEditStackItemToProject, useDispatch, useEditStackItem } from "../../../model";

export function useSaveProjectHandler() {
  const value = useEditStackItem();
  const dispatch = useDispatch();

  const valueRef = React.useRef(value);
  React.useEffect(() => {
    valueRef.current = value;
  }, [value]);

  React.useEffect(() => {
    const handler = async () => {
      const { current: value } = valueRef;
      const { filename } = value;
      const data = convertEditStackItemToProject(value);
      const str = JSON.stringify(data, null, "  ");
      await writeFile(filename, str);
      dispatch({ type: "save", payload: { filename } });
    };
    ipcRenderer.on("main:save", handler);
    return () => {
      ipcRenderer.off("main:save", handler);
    };
  }, [dispatch]);
}
