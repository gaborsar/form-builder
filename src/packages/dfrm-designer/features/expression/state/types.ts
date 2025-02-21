export interface AutoCompleteMap {
  paths: string[];
  enums: {
    [path: string]: string[];
  };
}
