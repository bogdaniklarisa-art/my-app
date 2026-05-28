"use client";

import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        setValue(JSON.parse(stored) as T);
      }
    } catch {
      // localStorage unavailable or parse error — keep initial value
    }
    setHydrated(true);
  }, [key]);

  function set(newValue: T | ((prev: T) => T)) {
    setValue((prev) => {
      const resolved = typeof newValue === "function" ? (newValue as (p: T) => T)(prev) : newValue;
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        // quota exceeded or unavailable
      }
      return resolved;
    });
  }

  function remove() {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
    setValue(initialValue);
  }

  return { value, set, remove, hydrated } as const;
}
