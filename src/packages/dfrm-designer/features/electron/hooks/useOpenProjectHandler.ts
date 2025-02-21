import { readFile } from "node:fs";
import { ipcRenderer } from "electron";
import React from "react";
import {
  CURRENT_MODEL_VERSION,
  type ExternalProject,
  convertProjectToEditStackItem,
  useDispatch,
} from "../../../model";

export function useOpenProjectHandler() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const handler = async (_: unknown, filename: string) => {
      const buffer = await new Promise<Buffer<ArrayBufferLike>>((resolve, reject) => {
        readFile(filename, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
      const str = buffer.toString("utf-8");
      const data = JSON.parse(str);
      if (
        typeof data !== "object" ||
        data === null ||
        Array.isArray(data) ||
        data.version !== CURRENT_MODEL_VERSION
      ) {
        return alert("Unsupported project file!");
      }
      const value = convertProjectToEditStackItem(filename, data as ExternalProject);
      dispatch({
        type: "load",
        payload: { value },
      });
    };
    ipcRenderer.on("main:open", handler);
    return () => {
      ipcRenderer.off("main:open", handler);
    };
  }, [dispatch]);
}
