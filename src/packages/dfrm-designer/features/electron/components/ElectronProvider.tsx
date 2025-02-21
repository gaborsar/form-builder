import React from "react";
import { useOpenProjectHandler } from "../hooks/useOpenProjectHandler";
import { useSaveProjectAsHandler } from "../hooks/useSaveProjectAsHandler";

export const ElectronProvider: React.FunctionComponent<React.PropsWithChildren> = React.memo(
  ({ children }) => {
    useOpenProjectHandler();
    useSaveProjectAsHandler();
    return <>{children}</>;
  },
);
