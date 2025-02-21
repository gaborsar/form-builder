import { type MessageMap, localizeMessage } from "./IntlUtils";
import type { RenderOptions, Schema } from "./Schema";
import {
  type RenderSingleChoiceResult,
  type SingleChoiceOptions,
  SingleChoiceSchema,
} from "./SingleChoice";

export interface DropdownOptions<Meta> extends SingleChoiceOptions<Meta> {
  messages?: MessageMap;
}

export interface RenderDropdownResult<Meta> extends RenderSingleChoiceResult<Meta> {
  type: "Dropdown";
  selectMessage: string;
  searchMessage: string;
  noOptionsMessage: string;
}

export class DropdownSchema<Meta>
  extends SingleChoiceSchema<Meta>
  implements Schema<Meta, RenderDropdownResult<Meta>>
{
  private _messages: MessageMap;

  constructor({ messages = {}, ...options }: DropdownOptions<Meta>) {
    super(options);
    this._messages = messages;
  }

  async render(options: RenderOptions<Meta>): Promise<RenderDropdownResult<Meta>> {
    const messages = {
      ...options.messages,
      ...this._messages,
    };
    const result: RenderDropdownResult<Meta> = {
      ...(await this._render(options)),
      type: "Dropdown",
      selectMessage: "",
      searchMessage: "",
      noOptionsMessage: "",
    };
    if (messages.select !== undefined) {
      result.selectMessage = localizeMessage(messages.select, options.locale);
    }
    if (messages.search !== undefined) {
      result.searchMessage = localizeMessage(messages.search, options.locale);
    }
    if (messages.noOptions !== undefined) {
      result.noOptionsMessage = localizeMessage(messages.noOptions, options.locale);
    }
    return result;
  }
}
