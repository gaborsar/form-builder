import React from "react";
import { useDispatch } from "../../../model";

export function useNewProjectTrigger(): () => void {
  const dispatch = useDispatch();
  return React.useCallback(() => {
    dispatch({ type: "reset" });
  }, [dispatch]);
}
