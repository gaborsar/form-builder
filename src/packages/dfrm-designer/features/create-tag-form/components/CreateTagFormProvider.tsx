import React from "react";
import { CreateTagForm } from "./CreateTagForm";
import { CreateTagFormContext } from "./CreateTagFormContext";

const noop = () => {};

export const CreateTagFormProvider: React.FunctionComponent<React.PropsWithChildren> = React.memo(
  ({ children }) => {
    const [isOpen, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const [resolve, setResolve] = React.useState<(id: string) => void>(noop);

    const onOpen = React.useCallback(
      (value: string): Promise<string> =>
        new Promise((resolve) => {
          setOpen(true);
          setValue(value);
          setResolve(() => resolve);
        }),
      [],
    );

    const onCancel = React.useCallback(() => {
      setOpen(false);
      resolve("");
    }, [resolve]);

    const onSuccess = React.useCallback(
      (id: string) => {
        setOpen(false);
        resolve(id);
      },
      [resolve],
    );

    return (
      <CreateTagFormContext.Provider value={onOpen}>
        {isOpen ? (
          <CreateTagForm value={value} onCancel={onCancel} onSuccess={onSuccess} />
        ) : (
          children
        )}
      </CreateTagFormContext.Provider>
    );
  },
);
