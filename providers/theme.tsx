"use client";

import { defaultTheme } from "@/constants/app";
import type { Theme } from "@/models/app";
import { capture } from "@/utils/analytics";
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface Props extends PropsWithChildren {
  defaultValue?: Theme;
}

interface Context {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  changeTheme: (value: Theme) => void;
  resetTheme: () => void;
}

const initial: Context = {
  theme: defaultTheme,
  setTheme: () => null,
  changeTheme: () => null,
  resetTheme: () => null,
};

const Context = createContext<Context>(initial);

const setThemeCookie = async (value: Theme) => {
  try {
    await fetch("/api/theme", {
      method: "POST",
      body: JSON.stringify(value),
      redirect: "manual",
    });
  } catch (error) {
    console.error("unable to set theme cookie", error);
  }
};

const ThemeProvider: FC<Props> = (props) => {
  const { defaultValue = initial.theme, children } = props;
  const [theme, setTheme] = useState<Context["theme"]>(defaultValue);

  const changeTheme: Context["changeTheme"] = useCallback((value) => {
    setTheme(value);
    capture("settings-theme", { value });
    const html = document.documentElement;
    if (html) html.setAttribute("data-theme", value);
    try {
      setThemeCookie(value);
    } catch (err) {
      console.error("unable to set theme in cookie", err);
    }
  }, []);

  const resetTheme = useCallback(() => {
    changeTheme(defaultTheme);
  }, [changeTheme]);

  const exposed = useMemo(
    () => ({ theme, setTheme, changeTheme, resetTheme }) satisfies Context,
    [theme, changeTheme, resetTheme],
  );

  useEffect(() => {
    const extendTheme = async () => await setThemeCookie(defaultValue);
    extendTheme();
  }, [defaultValue]);

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useTheme = (): Context => useContext(Context);

export default ThemeProvider;
