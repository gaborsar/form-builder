import React from "react";
import { useOpenProjectHandler } from "../hooks/useOpenProjectHandler";
import { useSaveProjectAsHandler } from "../hooks/useSaveProjectAsHandler";
import { useSaveProjectHandler } from "../hooks/useSaveProjectHandler";

export const ElectronProvider: React.FunctionComponent<React.PropsWithChildren> = React.memo(
  ({ children }) => {
    useOpenProjectHandler();
    useSaveProjectHandler();
    useSaveProjectAsHandler();
    return <>{children}</>;
  },
);
