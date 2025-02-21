import React from "react";
import { LayoutElementId, useDispatch, useLayoutState } from "../../../model";

interface UseEditorPropsResult {
  isFocused: boolean;
  onFocus(): void;
}

export function useEditorProps(): UseEditorPropsResult {
  const { activeElement } = useLayoutState();
  const dispatch = useDispatch();

  const onFocus = React.useCallback(() => {
    dispatch({
      type: "layout__focus-on-element",
      payload: { id: LayoutElementId.Editor },
    });
  }, [dispatch]);

  return {
    isFocused: activeElement === LayoutElementId.Editor,
    onFocus,
  };
}
