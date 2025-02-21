import React from "react";
import { useDispatch, useRightPanelState } from "../../../model";

interface UseRightPanelPropsResult {
  isFocused: boolean;
  isOpen: boolean;
  width: number;
  onFocus(): void;
  onChangeWidth(width: number): void;
}

// at this point we do not need this
const isFocused = false;
const onFocus = () => {};

export function useRightPanelProps(): UseRightPanelPropsResult {
  const { isOpen, width } = useRightPanelState();
  const dispatch = useDispatch();

  const onChangeWidth = React.useCallback(
    (width: number) => {
      dispatch({
        type: "right-panel__resize",
        payload: { width },
      });
    },
    [dispatch],
  );

  return {
    isFocused,
    isOpen,
    width,
    onFocus,
    onChangeWidth,
  };
}
