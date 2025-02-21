import React from "react";
import { MenuBarAction } from "../../../components/MenuBar";
import { useDispatch, useLeftPanelState } from "../../../model";

export const ToggleLefPanelButton: React.FunctionComponent = React.memo(() => {
  const { isOpen } = useLeftPanelState();
  const dispatch = useDispatch();
  const onClick = React.useCallback(() => {
    dispatch({ type: "left-panel__toggle" });
  }, [dispatch]);
  return (
    <MenuBarAction title="Toggle left panel (Alt+1)" onClick={onClick}>
      <div style={{ width: 13, height: 13, position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: 0.5,
            bottom: 0.5,
            left: 0.5,
            width: 3,
            border: "1px solid var(--app-text-color-1)",
            borderTopLeftRadius: 2,
            borderBottomLeftRadius: 2,
            backgroundColor: isOpen ? "var(--app-text-color-2)" : "transparent",
            transition: "background-color 100ms",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0.5,
            bottom: 0.5,
            right: 0.5,
            width: 6,
            border: "1px solid var(--app-text-color-1)",
            borderLeft: "none",
            borderTopRightRadius: 2,
            borderBottomRightRadius: 2,
          }}
        />
      </div>
    </MenuBarAction>
  );
});
