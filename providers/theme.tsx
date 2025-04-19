"use client";

import { setTheme as setThemeAction } from "@/actions/theme";
import { defaultTheme } from "@/constants/app";
import type { Theme } from "@/models/app";
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

const ThemeProvider: FC<Props> = (props) => {
  const { defaultValue = initial.theme, children } = props;
  const [theme, setTheme] = useState<Context["theme"]>(defaultValue);

  const changeTheme: Context["changeTheme"] = useCallback((value) => {
    setTheme(value);
    const html = document.documentElement;
    if (html) html.setAttribute("data-theme", value);
    try {
      setThemeAction(value);
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
    const extendTheme = async () => await setThemeAction(defaultValue);
    extendTheme();
  }, [defaultValue]);

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useTheme = (): Context => useContext(Context);

export default ThemeProvider;
