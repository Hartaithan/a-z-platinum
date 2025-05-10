"use client";

import { letterSets } from "@/constants/alphabet";
import { settingsKey } from "@/constants/storage";
import {
  readLocalStorageValue,
  useLocalStorage,
} from "@/hooks/use-local-storage";
import type { Settings } from "@/models/app";
import type { FC, PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useMemo } from "react";

interface Context {
  settings: Settings;
  handleDataChange: (value: Settings["data"]) => void;
  getLetterSet: () => string[];
  handleLettersChange: (value: Settings["letters"]) => void;
  resetSettings: () => void;
}

const defaultValue: Settings = {
  data: "platinums",
  letters: "all",
};

const initialValue: Context = {
  settings: defaultValue,
  handleDataChange: () => null,
  getLetterSet: () => [],
  handleLettersChange: () => null,
  resetSettings: () => null,
};

const merge = (stored: Partial<Settings> | null): Settings => ({
  ...defaultValue,
  ...(stored || {}),
});

const Context = createContext<Context>(initialValue);

const updateSettings = () => {
  if (typeof window === "undefined") return;
  const value = readLocalStorageValue({ key: settingsKey, defaultValue });
  const merged = merge(value);
  localStorage.setItem(settingsKey, JSON.stringify(merged));
};

updateSettings();

const SettingsProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [settings, setSettings] = useLocalStorage<Context["settings"]>({
    key: settingsKey,
    defaultValue,
  });

  const handleDataChange: Context["handleDataChange"] = useCallback(
    (value) => setSettings((prev) => ({ ...prev, data: value })),
    [setSettings],
  );

  const getLetterSet: Context["getLetterSet"] = useCallback(
    () => letterSets[settings.letters],
    [settings.letters],
  );

  const handleLettersChange: Context["handleLettersChange"] = useCallback(
    (value) => setSettings((prev) => ({ ...prev, letters: value })),
    [setSettings],
  );

  const resetSettings = useCallback(
    () => setSettings(defaultValue),
    [setSettings],
  );

  const exposed = useMemo(() => {
    return {
      settings,
      handleDataChange,
      getLetterSet,
      handleLettersChange,
      resetSettings,
    } satisfies Context;
  }, [
    settings,
    handleDataChange,
    getLetterSet,
    handleLettersChange,
    resetSettings,
  ]);

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useSettings = (): Context => useContext(Context);

export default SettingsProvider;
