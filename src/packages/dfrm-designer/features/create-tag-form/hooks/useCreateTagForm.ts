import React from "react";
import { CreateTagFormContext } from "../components/CreateTagFormContext";

export function useCreateTagForm(): (value: string) => Promise<string> {
  return React.useContext(CreateTagFormContext);
}
