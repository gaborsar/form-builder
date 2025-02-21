import type { SchemaTreeConfigAction } from "./actions";
import type { SchemaTreeConfigState } from "./state";

export function schemaTreeConfigReducer(
  state: SchemaTreeConfigState,
  action: SchemaTreeConfigAction,
): SchemaTreeConfigState {
  if (action.type === "schema-tree-config__set-tab") {
    return { ...state, tab: action.payload.tab };
  }
  return state;
}
