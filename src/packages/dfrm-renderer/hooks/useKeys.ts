import { append, insert, remove } from "ramda";
import React from "react";

interface UseKeysResult {
  keys: string[];
  insertKey(index: number): void;
  removeKey(index: number): void;
}

export function useKeys(values: unknown[]): UseKeysResult {
  const keysRef = React.useRef<string[]>([]);
  const idRef = React.useRef(0);

  const removeKey = React.useCallback((index: number) => {
    keysRef.current = append(`${idRef.current++}`, remove(index, 1, keysRef.current));
  }, []);

  const insertKey = React.useCallback((index: number) => {
    keysRef.current = insert(index + 1, `${idRef.current++}`, keysRef.current);
  }, []);

  const keys = React.useMemo(() => {
    if (keysRef.current.length < values.length) {
      for (let i = keysRef.current.length; i < values.length; i++) {
        keysRef.current.push(`${idRef.current++}`);
      }
    }
    if (keysRef.current.length > values.length) {
      keysRef.current = keysRef.current.slice(0, values.length);
    }
    return values.map((_, i) => keysRef.current[i]);
  }, [values]);

  return { keys, insertKey, removeKey };
}
