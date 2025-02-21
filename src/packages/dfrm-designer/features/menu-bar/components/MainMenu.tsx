import React from "react";
import {
  VscDiscard,
  VscFolderOpened,
  VscMenu,
  VscNewFile,
  VscRedo,
  VscSave,
} from "react-icons/vsc";
import {
  MenuBarDropdown,
  MenuBarDropdownItem,
  MenuBarDropdownItemSeparator,
} from "../../../components/MenuBar";
import { useDispatch, useRedoStack, useUndoStack } from "../../../model";
import {
  useNewProjectTrigger,
  useOpenProjectTrigger,
  useSaveProjectAsTrigger,
  useSaveProjectTrigger,
} from "../../electron";

export const MainMenu: React.FunctionComponent = React.memo(() => (
  <MenuBarDropdown label={<VscMenu />}>
    <NewProjectMenuItem />
    <OpenProjectMenuItem />
    <SaveProjectMenuItem />
    <SaveProjectAsMenuItem />
    <MenuBarDropdownItemSeparator />
    <UndoMenuItem />
    <RedoMenuItem />
  </MenuBarDropdown>
));

const NewProjectMenuItem: React.FunctionComponent = React.memo(() => {
  const onClick = useNewProjectTrigger();
  return (
    <MenuBarDropdownItem
      icon={<VscNewFile />}
      text="New project..."
      shortcut="Ctrl+N"
      onClick={onClick}
    />
  );
});

const OpenProjectMenuItem: React.FunctionComponent = React.memo(() => {
  const onClick = useOpenProjectTrigger();
  return (
    <MenuBarDropdownItem
      icon={<VscFolderOpened />}
      text="Open project..."
      shortcut="Ctrl+O"
      onClick={onClick}
    />
  );
});

const SaveProjectMenuItem: React.FunctionComponent = React.memo(() => {
  const onClick = useSaveProjectTrigger();
  return (
    <MenuBarDropdownItem
      icon={<VscSave />}
      text="Save project"
      shortcut="Ctrl+S"
      onClick={onClick}
    />
  );
});

const SaveProjectAsMenuItem: React.FunctionComponent = React.memo(() => {
  const onClick = useSaveProjectAsTrigger();
  return (
    <MenuBarDropdownItem
      icon={<VscSave />}
      text="Save project as..."
      shortcut="Ctrl+Shift+S"
      onClick={onClick}
    />
  );
});

const UndoMenuItem: React.FunctionComponent = React.memo(() => {
  const undo = useUndoStack();
  const dispatch = useDispatch();
  const onClick = React.useCallback(() => {
    dispatch({ type: "undo" });
  }, [dispatch]);
  return (
    <MenuBarDropdownItem
      disabled={undo.length === 0}
      icon={<VscDiscard />}
      text={undo.length === 0 ? "Undo" : `Undo (${undo.length})`}
      shortcut="Ctrl+Z"
      onClick={onClick}
    />
  );
});

const RedoMenuItem: React.FunctionComponent = React.memo(() => {
  const redo = useRedoStack();
  const dispatch = useDispatch();
  const onClick = React.useCallback(() => {
    dispatch({ type: "redo" });
  }, [dispatch]);
  return (
    <MenuBarDropdownItem
      disabled={redo.length === 0}
      icon={<VscRedo />}
      text={redo.length === 0 ? "Redo" : `Redo (${redo.length})`}
      shortcut="Ctrl+Y"
      onClick={onClick}
    />
  );
});
