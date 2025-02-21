import { useSelector } from "react-redux";
import type { State } from "../root";
import type { SchemaTreeConfigState } from "../schema-tree-config";

export function useSchemaTreeConfigState(): SchemaTreeConfigState {
  return useSelector(selectSchemaTreeConfigState);
}

function selectSchemaTreeConfigState({ schemaTreeConfig }: State): SchemaTreeConfigState {
  return schemaTreeConfig;
}
