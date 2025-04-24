"use client";

import type { FC, PropsWithChildren } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type YearSetDirection = "prev" | "next";
type YearSetHandler = (dir: YearSetDirection) => void;

interface Context {
  year: number | null;
  handleYear: YearSetHandler;
  resetYear: () => void;
}

const initialValue: Context = {
  year: null,
  handleYear: () => null,
  resetYear: () => null,
};

const Context = createContext<Context>(initialValue);

const FiltersProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [year, setYear] = useState<Context["year"]>(null);

  const handleYear: YearSetHandler = useCallback((dir) => {
    setYear((prev) => {
      const currentYear = new Date().getFullYear();
      const isAll = prev === null;
      if (dir === "next") {
        return isAll ? currentYear : prev + 1;
      } else {
        return isAll ? currentYear : prev - 1;
      }
    });
  }, []);

  const resetYear = useCallback(() => setYear(null), []);

  const exposed = useMemo(
    () => ({ year, handleYear, resetYear }) satisfies Context,
    [year, handleYear, resetYear],
  );

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useFilters = (): Context => useContext(Context);

export default FiltersProvider;
