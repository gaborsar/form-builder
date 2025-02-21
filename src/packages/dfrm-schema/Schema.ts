import type { ErrorMessageMap, MessageMap } from "./IntlUtils";
import type { Option } from "./Option";
import type { Path } from "./PathUtils";
import type { ValidationError } from "./ValidationUtils";

export interface Schema<Meta, Result extends RenderResult<Meta>> {
  render(options: RenderOptions<Meta>): Promise<Result>;
}

export interface RenderOptions<Meta> {
  fixValue?: boolean;
  locale: string;
  root: unknown;
  path: Path;
  namePrefix: string;
  value: unknown;
  messages?: MessageMap;
  errorMessages?: ErrorMessageMap;
  fetchRemoteOptions?(path: string): Promise<Option<Meta>[]>;
}

export interface RenderResult<Meta> {
  meta?: Meta;
  value: unknown;
  isValid: boolean;
  errors?: ValidationError[];
}
