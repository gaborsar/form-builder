import { ipcRenderer } from "electron";
import React from "react";

export function useIsWindowMaximized(): boolean {
  const [isMaximized, setMaximized] = React.useState(false);

  React.useEffect(() => {
    ipcRenderer.send("app:ismaximized");
  });

  React.useEffect(() => {
    const handler = (_: unknown, isMaximized: boolean) => {
      setMaximized(isMaximized);
    };
    ipcRenderer.on("main:ismaximized", handler);
    return () => {
      ipcRenderer.off("main:ismaximized", handler);
    };
  });

  React.useEffect(() => {
    const handler = () => {
      setMaximized(true);
    };
    ipcRenderer.on("main:maximize", handler);
    return () => {
      ipcRenderer.off("main:maximize", handler);
    };
  });

  React.useEffect(() => {
    const handler = () => {
      setMaximized(false);
    };
    ipcRenderer.on("main:unmaximize", handler);
    return () => {
      ipcRenderer.off("main:unmaximize", handler);
    };
  });

  return isMaximized;
}
