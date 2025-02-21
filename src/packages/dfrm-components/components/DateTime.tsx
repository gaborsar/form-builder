import cs from "classnames";
import React from "react";
import "./DateTime.css";

interface DateTimeProps {
  nowMessage?: string;
  name: string;
  value: string;
  onFocus?(): unknown;
  onBlur?(): unknown;
  onChangeValue(value: string): unknown;
}

const noop = () => {};

export const DateTime: React.FunctionComponent<DateTimeProps> = React.memo(
  ({
    nowMessage = "now",
    name,
    value: externalValue,
    onFocus = noop,
    onBlur = noop,
    onChangeValue,
  }) => {
    const [{ internalValue, date, time, isFocused }, setState] = React.useState<{
      internalValue: string;
      date: string;
      time: string;
      isFocused: boolean;
    }>({
      internalValue: "",
      date: "",
      time: "",
      isFocused: false,
    });

    React.useEffect(() => {
      if (externalValue !== internalValue) {
        const { date, time } = parseDateTimeValue(externalValue);
        setState((state) => ({
          ...state,
          internalValue: externalValue,
          date,
          time,
        }));
      }
    }, [externalValue, internalValue]);

    const onFocusInner = React.useCallback(() => {
      setState((state) => ({ ...state, isFocused: true }));
      onFocus();
    }, [onFocus]);

    const onBlurInner = React.useCallback(() => {
      setState((state) => ({ ...state, isFocused: false }));
      onBlur();
    }, [onBlur]);

    const onChangeDate = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = event.target.value;
        const value = formatDateTimeValue(date, time);
        setState((state) => ({ ...state, internalValue: value, date }));
        onChangeValue(value);
      },
      [onChangeValue, time],
    );

    const onChangeTime = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const time = event.target.value;
        const value = formatDateTimeValue(date, time);
        setState((state) => ({ ...state, internalValue: value, time }));
        onChangeValue(value);
      },
      [onChangeValue, date],
    );

    const onClickNow = React.useCallback(() => {
      const d = new Date();
      d.setMilliseconds(0);
      const date = getDateStr(d);
      const time = getTimeStr(d);
      const value = formatDateTimeValue(date, time);
      setState((state) => ({ ...state, internalValue: value, date, time }));
      onChangeValue(value);
    }, [onChangeValue]);

    return (
      <div
        className={cs("dfrm-date-time", {
          "dfrm-date-time--focused": isFocused,
        })}
      >
        <input
          type="date"
          id={name}
          max="9999-12-31"
          value={date}
          onFocus={onFocusInner}
          onBlur={onBlurInner}
          onChange={onChangeDate}
        />
        <input
          type="time"
          step="1"
          value={time}
          onFocus={onFocusInner}
          onBlur={onBlurInner}
          onChange={onChangeTime}
        />
        <button type="button" onFocus={onFocusInner} onBlur={onBlurInner} onClick={onClickNow}>
          {nowMessage}
        </button>
      </div>
    );
  },
);

function parseDateTimeValue(value: string): {
  date: string;
  time: string;
} {
  const d = new Date(value);
  const date = getDateStr(d);
  const time = getTimeStr(d);
  return { date, time };
}

function formatDateTimeValue(date: string, time: string): string {
  if (date === "" || time === "") {
    return "";
  }
  try {
    const dateSlices = date.split("-");
    if (dateSlices.length !== 3) {
      return "";
    }

    const timeSlices = time.split(":");
    if (timeSlices.length !== 3) {
      return "";
    }

    const d = new Date();

    d.setDate(1);
    d.setMonth(0);
    d.setFullYear(1970);

    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);

    d.setFullYear(Number.parseInt(dateSlices[0], 10));
    d.setMonth(Number.parseInt(dateSlices[1], 10) - 1);
    d.setDate(Number.parseInt(dateSlices[2], 10));

    d.setHours(Number.parseInt(timeSlices[0], 10));
    d.setMinutes(Number.parseInt(timeSlices[1], 10));
    d.setSeconds(Number.parseInt(timeSlices[2], 10));
    d.setMilliseconds(0);

    return d.toISOString();
  } catch (e) {
    return "";
  }
}

function getDateStr(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function getTimeStr(d: Date): string {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function pad(v: number) {
  return `${v < 10 ? "0" : ""}${v}`;
}
