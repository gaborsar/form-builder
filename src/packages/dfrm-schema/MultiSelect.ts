import { type MessageMap, localizeMessage } from "./IntlUtils";
import {
  type MultiChoiceOptions,
  MultiChoiceSchema,
  type RenderMultiChoiceResult,
} from "./MultiChoice";
import type { RenderOptions, Schema } from "./Schema";

export interface MultiSelectOptions<Meta> extends MultiChoiceOptions<Meta> {
  messages?: MessageMap;
}

export interface RenderMultiSelectResult<Meta> extends RenderMultiChoiceResult<Meta> {
  type: "MultiSelect";
  selectMessage: string;
  searchMessage: string;
  noOptionsMessage: string;
}

export class MultiSelectSchema<Meta>
  extends MultiChoiceSchema<Meta>
  implements Schema<Meta, RenderMultiSelectResult<Meta>>
{
  private _messages: MessageMap;

  constructor({ messages = {}, ...options }: MultiSelectOptions<Meta>) {
    super(options);
    this._messages = messages;
  }

  async render(options: RenderOptions<Meta>): Promise<RenderMultiSelectResult<Meta>> {
    const messages = {
      ...options.messages,
      ...this._messages,
    };
    const result: RenderMultiSelectResult<Meta> = {
      ...(await this._render(options)),
      type: "MultiSelect",
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
