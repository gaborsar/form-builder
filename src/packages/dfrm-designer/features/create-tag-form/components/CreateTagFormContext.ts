import React from "react";

export const CreateTagFormContext = React.createContext<(value: string) => Promise<string>>(() =>
  Promise.resolve(""),
);
