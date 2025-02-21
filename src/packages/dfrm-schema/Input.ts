import type { RenderButtonGroupResult } from "./ButtonGroup";
import type { RenderCheckboxResult } from "./Checkbox";
import type { RenderCheckboxGroupResult } from "./CheckboxGroup";
import type { RenderComputedResult } from "./Computed";
import type { RenderDateResult } from "./Date";
import type { RenderDateTimeResult } from "./DateTime";
import type { RenderDropdownResult } from "./Dropdown";
import type { RenderEmailResult } from "./Email";
import type { RenderLongTextResult } from "./LongText";
import type { RenderMultiSelectResult } from "./MultiSelect";
import type { RenderNumberResult } from "./Number";
import type { RenderPasswordResult } from "./Password";
import type { RenderPhoneNumberResult } from "./PhoneNumber";
import type { RenderRadioGroupResult } from "./RadioGroup";
import type { RenderRemoteDropdownResult } from "./RemoteDropdown";
import type { RenderShortTextResult } from "./ShortText";
import type { RenderSliderResult } from "./Slider";
import type { RenderSwitchResult } from "./Switch";
import type { RenderSwitchGroupResult } from "./SwitchGroup";
import type { RenderTimeResult } from "./Time";

export type RenderInputResult<Meta> =
  | RenderButtonGroupResult<Meta>
  | RenderCheckboxResult<Meta>
  | RenderCheckboxGroupResult<Meta>
  | RenderComputedResult<Meta>
  | RenderDateResult<Meta>
  | RenderDateTimeResult<Meta>
  | RenderRemoteDropdownResult<Meta>
  | RenderDropdownResult<Meta>
  | RenderEmailResult<Meta>
  | RenderLongTextResult<Meta>
  | RenderMultiSelectResult<Meta>
  | RenderNumberResult<Meta>
  | RenderPasswordResult<Meta>
  | RenderPhoneNumberResult<Meta>
  | RenderRadioGroupResult<Meta>
  | RenderShortTextResult<Meta>
  | RenderSliderResult<Meta>
  | RenderSwitchResult<Meta>
  | RenderSwitchGroupResult<Meta>
  | RenderTimeResult<Meta>;
