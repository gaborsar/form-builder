import React from "react";
import { LayoutElementId, useDispatch, useLayoutState, useLeftPanelState } from "../../../model";

interface UseLeftPanelPropResult {
  isFocused: boolean;
  isOpen: boolean;
  width: number;
  onFocus(): void;
  onChangeWidth(width: number): void;
}

export function useLeftPanelProps(): UseLeftPanelPropResult {
  const { activeElement } = useLayoutState();
  const { isOpen, width } = useLeftPanelState();
  const dispatch = useDispatch();

  const onFocus = React.useCallback(() => {
    dispatch({
      type: "layout__focus-on-element",
      payload: { id: LayoutElementId.LeftPanel },
    });
  }, [dispatch]);

  const onChangeWidth = React.useCallback(
    (width: number) => {
      dispatch({
        type: "left-panel__resize",
        payload: { width },
      });
    },
    [dispatch],
  );

  return {
    isFocused: activeElement === LayoutElementId.LeftPanel,
    isOpen,
    width,
    onFocus,
    onChangeWidth,
  };
}
