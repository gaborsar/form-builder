import React from "react";

interface UseDebouncedValueProps {
  value: string;
  onChangeValue(value: string): unknown;
}

interface UseDebouncedValueResult {
  debouncedValue: string;
  prepareChange(value: string): void;
  forceChange(): void;
}

export function useDebouncedValue({
  value,
  onChangeValue,
}: UseDebouncedValueProps): UseDebouncedValueResult {
  const [nextValue, setNextValue] = React.useState<string | null>(null);

  const timeoutRef = React.useRef(0);

  React.useEffect(() => {
    if (value === nextValue) {
      setNextValue(null);
    }
  }, [value, nextValue]);

  React.useEffect(
    () => () => {
      window.clearTimeout(timeoutRef.current);
    },
    [],
  );

  const debouncedValue = React.useMemo(
    () => (nextValue === null ? value : nextValue),
    [nextValue, value],
  );

  const prepareChange = React.useCallback(
    (value: string) => {
      setNextValue(value);
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        onChangeValue(value);
      }, 500);
    },
    [onChangeValue],
  );

  const forceChange = React.useCallback(() => {
    window.clearTimeout(timeoutRef.current);
    if (nextValue !== null) {
      onChangeValue(nextValue);
    }
  }, [onChangeValue, nextValue]);

  return { debouncedValue, prepareChange, forceChange };
}
