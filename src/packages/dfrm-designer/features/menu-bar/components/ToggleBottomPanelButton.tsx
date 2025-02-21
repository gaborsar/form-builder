import React from "react";
import { MenuBarAction } from "../../../components/MenuBar";
import { useBottomPanelState, useDispatch } from "../../../model";

export const ToggleBottomPanelButton: React.FunctionComponent = React.memo(() => {
  const { isOpen } = useBottomPanelState();
  const dispatch = useDispatch();
  const onClick = React.useCallback(() => {
    dispatch({ type: "bottom-panel__toggle" });
  }, [dispatch]);
  return (
    <MenuBarAction title="Toggle bottom panel (Alt+2)" onClick={onClick}>
      <div style={{ width: 13, height: 13, position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: 0.5,
            left: 0.5,
            right: 0.5,
            height: 6,
            border: "1px solid var(--app-text-color-1)",
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0.5,
            left: 0.5,
            right: 0.5,
            height: 3,
            border: "1px solid var(--app-text-color-1)",
            borderTop: "none",
            borderBottomLeftRadius: 2,
            borderBottomRightRadius: 2,
            backgroundColor: isOpen ? "var(--app-text-color-2)" : "transparent",
            transition: "background-color 100ms",
          }}
        />
      </div>
    </MenuBarAction>
  );
});
