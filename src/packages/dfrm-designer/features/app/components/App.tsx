import countries from "i18n-iso-countries";
import enCountries from "i18n-iso-countries/langs/en.json";
import huCountries from "i18n-iso-countries/langs/hu.json";
import React from "react";
import { Provider } from "react-redux";
import {
  Workbench,
  WorkbenchBody,
  WorkbenchBottomPanel,
  WorkbenchEditor,
  WorkbenchLeftPanel,
  WorkbenchMainContent,
  WorkbenchRightPanel,
} from "../../../components/Workbench";
import { store } from "../../../model";
import { ConfigRenderer } from "../../config";
import { EditorRenderer } from "../../editor";
import { ElectronProvider } from "../../electron";
import { ExplorerRenderer } from "../../explorer";
import { InspectorProvider } from "../../inspector";
import { MenuBarRenderer } from "../../menu-bar";
import { ToolboxRenderer } from "../../toolbox";
import { useBottomPanelProps } from "../hooks/useBottomPanelProps";
import { useEditorProps } from "../hooks/useEditorProps";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import { useLeftPanelProps } from "../hooks/useLeftPanelProps";
import { useRightPanelProps } from "../hooks/useRightPanelProps";
import "./App.css";

countries.registerLocale(huCountries);
countries.registerLocale(enCountries);

export const App: React.FunctionComponent = React.memo(() => (
  <Provider store={store}>
    <ElectronProvider>
      <InspectorProvider>
        <Content />
      </InspectorProvider>
    </ElectronProvider>
  </Provider>
));

const Content: React.FunctionComponent = React.memo(() => {
  useKeyboardShortcuts();
  const leftPanelProps = useLeftPanelProps();
  const editorProps = useEditorProps();
  const bottomPanelProps = useBottomPanelProps();
  const rightPanelProps = useRightPanelProps();
  return (
    <Workbench>
      <MenuBarRenderer />
      <WorkbenchBody>
        <WorkbenchLeftPanel {...leftPanelProps}>
          <ExplorerRenderer />
        </WorkbenchLeftPanel>
        <WorkbenchMainContent>
          <WorkbenchEditor {...editorProps}>
            <EditorRenderer />
          </WorkbenchEditor>
          <WorkbenchBottomPanel {...bottomPanelProps}>
            <ToolboxRenderer />
          </WorkbenchBottomPanel>
        </WorkbenchMainContent>
        <WorkbenchRightPanel {...rightPanelProps}>
          <ConfigRenderer />
        </WorkbenchRightPanel>
      </WorkbenchBody>
    </Workbench>
  );
});
