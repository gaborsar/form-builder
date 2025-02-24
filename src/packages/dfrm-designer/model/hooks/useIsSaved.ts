import { useSelector } from "react-redux";
import type { State } from "../root";

export function useIsSaved(): boolean {
  return useSelector(selectIsSaved);
}

function selectIsSaved({ savedValue, value }: State): boolean {
  return JSON.stringify(savedValue) === JSON.stringify(value);
}
