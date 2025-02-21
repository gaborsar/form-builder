import React from "react";
import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeRestore,
} from "react-icons/vsc";
import {
  WorkbenchMenuBar,
  WorkbenchMenuBarCenter,
  WorkbenchMenuBarLeft,
  WorkbenchMenuBarRight,
} from "../../../components/Workbench";
import { useEditStackItem } from "../../../model";
import {
  useCloseWindowTrigger,
  useIsWindowMaximized,
  useMaximizeWindowTrigger,
  useMinimizeWindowTrigger,
} from "../../electron";
import { LanguageMenu } from "./LanguageMenu";
import { MainMenu } from "./MainMenu";
import { ToggleBottomPanelButton } from "./ToggleBottomPanelButton";
import { ToggleLefPanelButton } from "./ToggleLeftPanelButton";
import { ToggleRightPanelButton } from "./ToggleRightPanelButton";

export const MenuBarRenderer: React.FunctionComponent = React.memo(() => {
  const { filename } = useEditStackItem();
  return (
    <WorkbenchMenuBar>
      <WorkbenchMenuBarLeft>
        <MainMenu />
        <ToggleLefPanelButton />
        <ToggleBottomPanelButton />
        <ToggleRightPanelButton />
      </WorkbenchMenuBarLeft>
      <WorkbenchMenuBarCenter>{filename || "Untitled"} - Form Builder</WorkbenchMenuBarCenter>
      <WorkbenchMenuBarRight>
        <LanguageMenu />
      </WorkbenchMenuBarRight>
    </WorkbenchMenuBar>
  );
});
