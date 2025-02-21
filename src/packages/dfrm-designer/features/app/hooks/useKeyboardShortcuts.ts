import React from "react";
import { LayoutElementId, useDispatch } from "../../../model";
import {
  useNewProjectTrigger,
  useOpenProjectTrigger,
  useSaveProjectAsTrigger,
  useSaveProjectTrigger,
} from "../../electron";

export function useKeyboardShortcuts() {
  const onNewProject = useNewProjectTrigger();
  const onOpenProject = useOpenProjectTrigger();
  const onSaveProject = useSaveProjectTrigger();
  const onSaveProjectAs = useSaveProjectAsTrigger();

  const dispatch = useDispatch();

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key === "n") {
          onNewProject();
        } else if (event.key === "o") {
          onOpenProject();
        } else if (event.key === "s") {
          onSaveProject();
        } else if (event.key === "S") {
          onSaveProjectAs();
        } else {
          if (event.target === document.body) {
            if (event.key === "z") {
              event.preventDefault();
              dispatch({
                type: "undo",
              });
            } else if (event.key === "y" || event.key === "Z") {
              event.preventDefault();
              dispatch({
                type: "redo",
              });
            }
          }
        }
      }
      if (event.altKey) {
        if (event.key === "1") {
          event.preventDefault();
          dispatch({
            type: "left-panel__toggle",
          });
        } else if (event.key === "2") {
          event.preventDefault();
          dispatch({
            type: "bottom-panel__toggle",
          });
        } else if (event.key === "3") {
          event.preventDefault();
          dispatch({
            type: "right-panel__toggle",
          });
        } else if (event.key === "0") {
          event.preventDefault();
          dispatch({
            type: "left-panel__reset",
          });
          dispatch({
            type: "bottom-panel__reset",
          });
          dispatch({
            type: "right-panel__reset",
          });
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          dispatch({
            type: "layout__focus-on-element",
            payload: {
              id: LayoutElementId.Editor,
            },
          });
          dispatch({
            type: "editor__select-previous-tab",
          });
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          dispatch({
            type: "layout__focus-on-element",
            payload: {
              id: LayoutElementId.Editor,
            },
          });
          dispatch({
            type: "editor__select-next-tab",
          });
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onNewProject, onOpenProject, onSaveProject, onSaveProjectAs, dispatch]);
}
