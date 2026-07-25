"use client";

import { useEffect, useRef, useState } from "react";
import { readStorage, writeStorage } from "./storage";

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const isFirstWrite = useRef(true);

  useEffect(() => {
    setValue(readStorage<T>(key, initialValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (isFirstWrite.current) {
      isFirstWrite.current = false;
      return;
    }
    writeStorage(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
