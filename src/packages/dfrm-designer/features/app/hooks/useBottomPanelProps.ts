import React from "react";
import { useBottomPanelState, useDispatch } from "../../../model";

interface UseBottomPanelPropsResult {
  isFocused: boolean;
  isOpen: boolean;
  height: number;
  onFocus(): void;
  onChangeHeight(height: number): void;
}

// at this point we do not need this
const isFocused = false;
const onFocus = () => {};

export function useBottomPanelProps(): UseBottomPanelPropsResult {
  const { isOpen, height } = useBottomPanelState();
  const dispatch = useDispatch();

  const onChangeHeight = React.useCallback(
    (height: number) => {
      dispatch({
        type: "bottom-panel__resize",
        payload: { height },
      });
    },
    [dispatch],
  );

  return {
    isFocused,
    isOpen,
    height,
    onFocus,
    onChangeHeight,
  };
}
