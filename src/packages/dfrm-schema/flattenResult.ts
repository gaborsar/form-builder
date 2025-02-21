import type { RenderButtonGroupResult } from "./ButtonGroup";
import type { RenderCheckboxResult } from "./Checkbox";
import type { RenderCheckboxGroupResult } from "./CheckboxGroup";
import type { RenderColumnResult } from "./Column";
import type { RenderComputedResult } from "./Computed";
import type { RenderDateResult } from "./Date";
import type { RenderDateTimeResult } from "./DateTime";
import type { RenderDropdownResult } from "./Dropdown";
import type { RenderEmailResult } from "./Email";
import type { RenderFieldResult } from "./Field";
import type { RenderFieldGroupListItemResult, RenderFieldGroupListResult } from "./FieldGroupList";
import type { RenderFieldListItemResult, RenderFieldListResult } from "./FieldList";
import type { RenderFieldsetResult } from "./Fieldset";
import type { RenderFormResult } from "./Form";
import type { RenderLongTextResult } from "./LongText";
import type { RenderMultiSelectResult } from "./MultiSelect";
import type { RenderNumberResult } from "./Number";
import type { RenderObjectResult } from "./Object";
import type { RenderPasswordResult } from "./Password";
import type { Path } from "./PathUtils";
import type { RenderPhoneNumberResult } from "./PhoneNumber";
import type { RenderRadioGroupResult } from "./RadioGroup";
import type { RenderRemoteDropdownResult } from "./RemoteDropdown";
import type { RenderRowResult } from "./Row";
import type { RenderResult } from "./Schema";
import type { RenderShortTextResult } from "./ShortText";
import type { RenderSliderResult } from "./Slider";
import type { RenderSwitchResult } from "./Switch";
import type { RenderSwitchGroupResult } from "./SwitchGroup";
import type { RenderTimeResult } from "./Time";
import { isArray, isObject } from "./TypeUtils";

export interface FlatResult extends FlatLog {
  value: unknown;
}

export interface FlatLog {
  errors: LogItem[];
  warnings: LogItem[];
  messages: LogItem[];
}

export type LogItem = LogItemWithPath | LogItemWithValue;

export interface LogItemWithPath {
  path: Path;
  details: LogDetails;
}

export interface LogItemWithValue {
  value: unknown;
  details: LogDetails;
}

export interface LogDetails {
  [key: string]: unknown;
}

export type MapMetaToLogDetailsFn<Meta> = (meta: Meta) => LogDetails;
export type MergeLogDetailsFn = (a: LogDetails, b: LogDetails) => LogDetails;

export function flattenFormResult<Meta>(
  result: RenderFormResult<Meta>,
  mapMetaToLogDetails: MapMetaToLogDetailsFn<Meta>,
): FlatResult {
  const path: Path = [];
  const out: FlatResult = {
    value: result.value,
    errors: [],
    warnings: [],
    messages: [],
  };

  copyErrors(path, result, out);
  copyMeta(path, result, out, mapMetaToLogDetails);

  if (result.children !== undefined) {
    for (const child of result.children) {
      copyLog(out, flattenFieldsetResult(path, child, mapMetaToLogDetails));
    }
  }

  out.errors = reduceLogItems(out.errors);
  out.warnings = reduceLogItems(out.warnings);
  out.messages = reduceLogItems(out.messages);

  return out;
}

function flattenFieldsetResult<Meta>(
  path: Path,
  result: RenderFieldsetResult<Meta>,
  mapMetaToLogDetails: MapMetaToLogDetailsFn<Meta>,
): FlatLog {
  const out: FlatLog = {
    errors: [],
    warnings: [],
    messages: [],
  };

  copyErrors(path, result, out);
  copyMeta(path, result, out, mapMetaToLogDetails);

  if (result.children === undefined) {
    return out;
  }

  for (const child of result.children) {
    copyLog(out, flattenRowResult(path, child, mapMetaToLogDetails));
  }

  return out;
}

function flattenRowResult<Meta>(
  path: Path,
  result: RenderRowResult<Meta>,
  mapMetaToLogDetails: MapMetaToLogDetailsFn<Meta>,
): FlatLog {
  const out: FlatLog = {
    errors: [],
    warnings: [],
    messages: [],
  };

  copyErrors(path, result, out);
  copyMeta(path, result, out, mapMetaToLogDetails);

  if (result.children === undefined) {
    return out;
  }

  for (const child of result.children) {
    copyLog(out, flattenColumnResult(path, child, mapMetaToLogDetails));
  }

  return out;
}

function flattenColumnResult<Meta>(
  path: Path,
  result: RenderColumnResult<Meta>,
  mapMetaToLogDetails: MapMetaToLogDetailsFn<Meta>,
): FlatLog {
  const out: FlatLog = {
    errors: [],
    warnings: [],
    messages: [],
  };
  copyErrors(path, result, out);
  copyMeta(path, result, out, mapMetaToLogDetails);

  if (result.child === undefined) {
    return out;
  }

  if (result.child.type === "Object") {
    copyLog(
      out,
      flattenObjectResult(path.concat(result.child.key), result.child, mapMetaToLogDetails),
    );
  }
  if (result.child.type === "FieldGroupList") {
    copyLog(
      out,
      flattenFieldGroupListResult(path.concat(result.child.key), result.child, mapMetaToLogDetails),
    );
  }
  if (result.child.type === "FieldList") {
    copyLog(
      out,
      flattenFieldListResult(path.concat(result.child.key), result.child, mapMetaToLogDetails),
    );
  }
  if (result.child.type === "Field") {
    copyLog(
      out,
      flattenFieldResult(path.concat(result.child.key), result.child, mapMetaToLogDetails),
    );
  }

  return out;
}

function flattenObjectResult<Meta>(
  path: Path,
  result: RenderObjectResult<Meta>,
  mapMetaToLogDetails: MapMetaToLogDetailsFn<Meta>,
): FlatLog {
  const out: FlatLog = {
    errors: [],
    warnings: [],
    messages: [],
  };

  copyErrors(path, result, out);
  copyMeta(path, result, out, mapMetaToLogDetails);

  if (result.children === undefined) {
    return out;
  }

  for (const child of result.children) {
    copyLog(out, flattenRowResult(path, child, mapMetaToLogDetails));
  }

  return out;
}

function flattenFieldGroupListResult<Meta>(
  path: Path,
  result: RenderFieldGroupListResult<Meta>,
  mapMetaToLogDetails: MapMetaToLogDetailsFn<Meta>,
): FlatLog {
  const out: FlatLog = {
    errors: [],
    warnings: [],
    messages: [],
  };

  copyErrors(path, result, out);
  copyMeta(path, result, out, mapMetaToLogDetails);

  if (result.minLength !== undefined) {
    out.messages.push({
      path,
      details: { minLength: result.minLength },
    });
  }
  if (result.maxLength !== undefined) {
    out.messages.push({
      path,
      details: { maxLength: result.maxLength },
    });
  }

  if (result.children === undefined) {
    return out;
  }

  for (const child of result.children) {
    copyLog(
      out,
      flattenFieldGroupListItemResult(path.concat(child.index), child, mapMetaToLogDetails),
    );
  }

  return out;
}

function flattenFieldGroupListItemResult<Meta>(
  path: Path,
  result: RenderFieldGroupListItemResult<Meta>,
  mapMetaToLogDetails: MapMetaToLogDetailsFn<Meta>,
): FlatLog {
  const out: FlatLog = {
    errors: [],
    warnings: [],
    messages: [],
  };

  copyErrors(path, result, out);
  copyMeta(path, result, out, mapMetaToLogDetails);

  if (result.children === undefined) {
    return out;
  }

  for (const child of result.children) {
    copyLog(out, flattenRowResult(path, child, mapMetaToLogDetails));
  }

  return out;
}

function flattenFieldListResult<Meta>(
  path: Path,
  result: RenderFieldListResult<Meta>,
  mapMetaToLogDetails: MapMetaToLogDetailsFn<Meta>,
): FlatLog {
  const out: FlatLog = {
    errors: [],
    warnings: [],
    messages: [],
  };

  copyErrors(path, result, out);
  copyMeta(path, result, out, mapMetaToLogDetails);

  if (result.minLength !== undefined) {
    out.messages.push({
      path,
      details: { minLength: result.minLength },
    });
  }
  if (result.maxLength !== undefined) {
    out.messages.push({
      path,
      details: { maxLength: result.maxLength },
    });
  }
  if (result.unique !== undefined) {
    out.messages.push({
      path,
      details: { unique: result.unique },
    });
  }

  if (result.children === undefined) {
    return out;
  }

  for (const child of result.children) {
    copyLog(out, flattenFieldListItemResult(path.concat(child.index), child, mapMetaToLogDetails));
  }

  return out;
}

function flattenFieldListItemResult<Meta>(
  path: Path,
  result: RenderFieldListItemResult<Meta>,
  mapMetaToLogDetails: MapMetaToLogDetailsFn<Meta>,
): FlatLog {
  const out: FlatLog = {
    errors: [],
    warnings: [],
    messages: [],
  };

  copyErrors(path, result, out);
  copyMeta(path, result, out, mapMetaToLogDetails);

  if (result.child === undefined) {
    return out;
  }

  copyLog(out, flattenInputResult(path, result.child, mapMetaToLogDetails));

  return out;
}

function flattenFieldResult<Meta>(
  path: Path,
  result: RenderFieldResult<Meta>,
  mapMetaToLogDetails: MapMetaToLogDetailsFn<Meta>,
): FlatLog {
  const out: FlatLog = {
    errors: [],
    warnings: [],
    messages: [],
  };

  copyErrors(path, result, out);
  copyMeta(path, result, out, mapMetaToLogDetails);

  if (result.child === undefined) {
    return out;
  }

  copyLog(out, flattenInputResult(path, result.child, mapMetaToLogDetails));

  return out;
}

function flattenInputResult<Meta>(
  path: Path,
  result:
    | RenderRemoteDropdownResult<Meta>
    | RenderDropdownResult<Meta>
    | RenderButtonGroupResult<Meta>
    | RenderRadioGroupResult<Meta>
    | RenderSliderResult<Meta>
    | RenderMultiSelectResult<Meta>
    | RenderCheckboxGroupResult<Meta>
    | RenderSwitchGroupResult<Meta>
    | RenderShortTextResult<Meta>
    | RenderLongTextResult<Meta>
    | RenderNumberResult<Meta>
    | RenderDateResult<Meta>
    | RenderTimeResult<Meta>
    | RenderDateTimeResult<Meta>
    | RenderEmailResult<Meta>
    | RenderPhoneNumberResult<Meta>
    | RenderPasswordResult<Meta>
    | RenderCheckboxResult<Meta>
    | RenderSwitchResult<Meta>
    | RenderComputedResult<Meta>,
  mapMetaToLogDetails: MapMetaToLogDetailsFn<Meta>,
): FlatLog {
  switch (result.type) {
    case "RemoteDropdown":
      return flattenRemoteDropdownResult(path, result, mapMetaToLogDetails);
    case "Dropdown":
    case "ButtonGroup":
    case "RadioGroup":
    case "Slider":
      return flattenSingleChoiceResult(path, result, mapMetaToLogDetails);
    case "MultiSelect":
    case "CheckboxGroup":
    case "SwitchGroup":
      return flattenMultiChoiceResult(path, result, mapMetaToLogDetails);
    case "ShortText":
    case "LongText":
    case "Password":
      return flattenTextResult(path, result, mapMetaToLogDetails);
    case "Number":
      return flattenNumberResult(path, result, mapMetaToLogDetails);
    case "Date":
    case "Time":
    case "DateTime":
    case "Email":
    case "PhoneNumber":
    case "Checkbox":
    case "Switch":
      return flattenSimpleInputResult(path, result, mapMetaToLogDetails);
    case "Computed":
      return flattenComputedResult(path, result, mapMetaToLogDetails);
  }
}

function flattenRemoteDropdownResult<Meta>(
  path: Path,
  result: RenderRemoteDropdownResult<Meta>,
  mapMetaToLogDetails: MapMetaToLogDetailsFn<Meta>,
): FlatLog {
  const out: FlatLog = {
    errors: [],
    warnings: [],
    messages: [],
  };

  copyErrors(path, result, out);
  copyMeta(path, result, out, mapMetaToLogDetails);

  if (result.required !== undefined) {
    out.messages.push({
      path,
      details: { required: result.required },
    });
  }

  const selectedOption = result.options.find((option) => option.value === result.value);
  if (selectedOption !== undefined && selectedOption.meta !== undefined) {
    out.messages.push({
      value: selectedOption.value,
      details: mapMetaToLogDetails(selectedOption.meta),
    });
  }

  return out;
}

function flattenSingleChoiceResult<Meta>(
  path: Path,
  result:
    | RenderDropdownResult<Meta>
    | RenderButtonGroupResult<Meta>
    | RenderRadioGroupResult<Meta>
    | RenderSliderResult<Meta>,
  mapMetaToLogDetails: MapMetaToLogDetailsFn<Meta>,
): FlatLog {
  const out: FlatLog = {
    errors: [],
    warnings: [],
    messages: [],
  };

  copyErrors(path, result, out);
  copyMeta(path, result, out, mapMetaToLogDetails);

  out.messages.push({
    path,
    details: { options: result.options },
  });
  if (result.required !== undefined) {
    out.messages.push({
      path,
      details: { required: result.required },
    });
  }
  if (result.defaultValue !== undefined) {
    out.messages.push({
      path,
      details: { defaultValue: result.defaultValue },
    });
  }

  const selectedOption = result.options.find((option) => option.value === result.value);
  if (selectedOption !== undefined && selectedOption.meta !== undefined) {
    if (result.transferOptionMetaToParent) {
      out.messages.push({
        path: path.slice(0, -1),
        details: mapMetaToLogDetails(selectedOption.meta),
      });
    } else {
      out.messages.push({
        value: selectedOption.value,
        details: mapMetaToLogDetails(selectedOption.meta),
      });
    }
  }

  return out;
}

function flattenMultiChoiceResult<Meta>(
  path: Path,
  result:
    | RenderMultiSelectResult<Meta>
    | RenderCheckboxGroupResult<Meta>
    | RenderSwitchGroupResult<Meta>,
  mapMetaToLogDetails: MapMetaToLogDetailsFn<Meta>,
): FlatLog {
  const out: FlatLog = {
    errors: [],
    warnings: [],
    messages: [],
  };

  copyErrors(path, result, out);
  copyMeta(path, result, out, mapMetaToLogDetails);

  out.messages.push({
    path,
    details: { options: result.options },
  });
  if (result.required !== undefined) {
    out.messages.push({
      path,
      details: { required: result.required },
    });
  }
  if (result.defaultValue !== undefined) {
    out.messages.push({
      path,
      details: { defaultValue: result.defaultValue },
    });
  }

  const selectedOption = result.options.find((option) => option.value === result.value);
  if (selectedOption !== undefined && selectedOption.meta !== undefined) {
    out.messages.push({
      value: selectedOption.value,
      details: mapMetaToLogDetails(selectedOption.meta),
    });
  }

  return out;
}

function flattenTextResult<Meta>(
  path: Path,
  result: RenderShortTextResult<Meta> | RenderLongTextResult<Meta> | RenderPasswordResult<Meta>,
  mapMetaToLogDetails: MapMetaToLogDetailsFn<Meta>,
): FlatLog {
  const out: FlatLog = {
    errors: [],
    warnings: [],
    messages: [],
  };

  copyErrors(path, result, out);
  copyMeta(path, result, out, mapMetaToLogDetails);

  if (result.required !== undefined) {
    out.messages.push({
      path,
      details: { required: result.required },
    });
  }
  if (result.defaultValue !== undefined) {
    out.messages.push({
      path,
      details: { defaultValue: result.defaultValue },
    });
  }
  if (result.minLength !== undefined) {
    out.messages.push({
      path,
      details: { minLength: result.minLength },
    });
  }
  if (result.maxLength !== undefined) {
    out.messages.push({
      path,
      details: { maxLength: result.maxLength },
    });
  }
  if (result.pattern !== undefined) {
    out.messages.push({
      path,
      details: { pattern: result.pattern },
    });
  }

  return out;
}

function flattenNumberResult<Meta>(
  path: Path,
  result: RenderNumberResult<Meta>,
  mapMetaToLogDetails: MapMetaToLogDetailsFn<Meta>,
): FlatLog {
  const out: FlatLog = {
    errors: [],
    warnings: [],
    messages: [],
  };

  copyErrors(path, result, out);
  copyMeta(path, result, out, mapMetaToLogDetails);

  if (result.originalUnit !== undefined && Object.keys(result.originalUnit).length !== 0) {
    out.messages.push({
      path,
      details: { unit: result.originalUnit },
    });
  }
  if (result.required !== undefined) {
    out.messages.push({
      path,
      details: { required: result.required },
    });
  }
  if (result.defaultValue !== undefined) {
    out.messages.push({
      path,
      details: { defaultValue: result.defaultValue },
    });
  }
  if (result.precision !== undefined) {
    out.messages.push({
      path,
      details: { precision: result.precision },
    });
  }
  if (result.multipleOf !== undefined) {
    out.messages.push({
      path,
      details: { multipleOf: result.multipleOf },
    });
  }
  if (result.min !== undefined) {
    out.messages.push({
      path,
      details: { min: result.min },
    });
  }
  if (result.max !== undefined) {
    out.messages.push({
      path,
      details: { max: result.max },
    });
  }
  if (result.minExclusive !== undefined) {
    out.messages.push({
      path,
      details: { minExclusive: result.minExclusive },
    });
  }
  if (result.maxExclusive !== undefined) {
    out.messages.push({
      path,
      details: { maxExclusive: result.maxExclusive },
    });
  }

  return out;
}

function flattenSimpleInputResult<Meta>(
  path: Path,
  result:
    | RenderDateResult<Meta>
    | RenderTimeResult<Meta>
    | RenderDateTimeResult<Meta>
    | RenderEmailResult<Meta>
    | RenderPhoneNumberResult<Meta>
    | RenderCheckboxResult<Meta>
    | RenderSwitchResult<Meta>,
  mapMetaToLogDetails: MapMetaToLogDetailsFn<Meta>,
): FlatLog {
  const out: FlatLog = {
    errors: [],
    warnings: [],
    messages: [],
  };

  copyErrors(path, result, out);
  copyMeta(path, result, out, mapMetaToLogDetails);

  if (result.required !== undefined) {
    out.messages.push({
      path,
      details: { required: result.required },
    });
  }
  if (result.defaultValue !== undefined) {
    out.messages.push({
      path,
      details: { defaultValue: result.defaultValue },
    });
  }

  return out;
}

function flattenComputedResult<Meta>(
  path: Path,
  result: RenderComputedResult<Meta>,
  mapMetaToLogDetails: MapMetaToLogDetailsFn<Meta>,
): FlatLog {
  const out: FlatLog = {
    errors: [],
    warnings: [],
    messages: [],
  };

  copyErrors(path, result, out);
  copyMeta(path, result, out, mapMetaToLogDetails);

  if (result.originalUnit !== undefined && Object.keys(result.originalUnit).length !== 0) {
    out.messages.push({
      path,
      details: { unit: result.originalUnit },
    });
  }

  return out;
}

function copyLog(logA: FlatLog, logB: FlatLog): void {
  if (logB.errors !== undefined) {
    if (logA.errors === undefined) {
      logA.errors = logB.errors;
    } else {
      logA.errors = logA.errors.concat(logB.errors);
    }
  }
  if (logB.warnings !== undefined) {
    if (logA.warnings === undefined) {
      logA.warnings = logB.warnings;
    } else {
      logA.warnings = logA.warnings.concat(logB.warnings);
    }
  }
  if (logB.messages !== undefined) {
    if (logA.messages === undefined) {
      logA.messages = logB.messages;
    } else {
      logA.messages = logA.messages.concat(logB.messages);
    }
  }
}

function copyErrors<Meta>(path: Path, result: RenderResult<Meta>, log: FlatLog): void {
  if (result.errors === undefined || result.errors.length === 0) {
    return;
  }
  if (log.errors === undefined) {
    log.errors = [];
  }
  for (const error of result.errors) {
    log.errors.push({
      path,
      details: { type: error.type, ...error.details },
    });
  }
}

function copyMeta<Meta>(
  path: Path,
  result: RenderResult<Meta>,
  log: FlatLog,
  mapMetaToLogDetails: MapMetaToLogDetailsFn<Meta>,
): void {
  if (result.meta === undefined) {
    return;
  }
  const details = mapMetaToLogDetails(result.meta);
  if (Object.keys(details).length === 0) {
    return;
  }
  log.messages.push({ path, details });
}

function reduceLogItems(items: LogItem[]): LogItem[] {
  const map: { [key: string]: LogItemWithPath } = {};
  const list: LogItemWithValue[] = [];
  for (const item of items) {
    if ("path" in item) {
      const key = item.path.join("/");
      if (key in map) {
        map[key] = {
          ...map[key],
          details: mergeDeep(map[key].details, item.details) as LogDetails,
        };
      } else {
        map[key] = item;
      }
    } else {
      list.push(item);
    }
  }
  return (Object.values(map) as LogItem[]).concat(list);
}

function mergeDeep(a: unknown, b: unknown): unknown {
  if (isObject(a) && isObject(b)) {
    const c: { [key: string]: unknown } = { ...a };
    for (const k of Object.keys(b)) {
      if (k in c) {
        c[k] = mergeDeep(c[k], b[k]);
      } else {
        c[k] = b[k];
      }
    }
    return c;
  }
  if (isArray(a) && isArray(b)) {
    return a.concat(b);
  }
  return b;
}
