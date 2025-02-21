import { writeFile } from "node:fs";
import { ipcRenderer } from "electron";
import React from "react";
import { convertEditStackItemToProject, useDispatch, useEditStackItem } from "../../../model";

export function useSaveProjectAsHandler() {
  const value = useEditStackItem();
  const dispatch = useDispatch();

  const valueRef = React.useRef(value);
  React.useEffect(() => {
    valueRef.current = value;
  }, [value]);

  React.useEffect(() => {
    const handler = async (_: unknown, filename: string) => {
      const data = convertEditStackItemToProject(valueRef.current);
      const str = JSON.stringify(data, null, "\t");
      await new Promise<void>((resolve, reject) => {
        writeFile(filename, str, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
      dispatch({ type: "save", payload: { filename } });
    };
    ipcRenderer.on("main:saveAs", handler);
    return () => {
      ipcRenderer.off("main:saveAs", handler);
    };
  }, [dispatch]);
}
