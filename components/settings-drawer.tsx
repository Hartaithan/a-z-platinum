"use client";

import DifficultyHint from "@/components/difficulty-hint";
import SettingsSelect from "@/components/settings-select";
import SettingsSwitch from "@/components/settings-switch";
import { difficultyKeys, difficultyLabels } from "@/constants/alphabet";
import { dataKeys, dataLabels, themes, themesLabels } from "@/constants/app";
import { useSettings } from "@/providers/settings";
import { useTheme } from "@/providers/theme";
import { Button } from "@/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/ui/drawer";
import { Settings, X } from "lucide-react";
import { FC, memo, useCallback } from "react";

const Content: FC = () => {
  const { theme, changeTheme, resetTheme } = useTheme();
  const {
    settings,
    handleDataChange,
    handleDifficultyChange,
    handleHideChange,
    resetSettings,
  } = useSettings();

  const handleReset = useCallback(() => {
    resetSettings();
    resetTheme();
  }, [resetSettings, resetTheme]);

  return (
    <>
      <div className="flex flex-col space-y-4 p-4 pt-2">
        <SettingsSelect
          id="theme"
          label="Theme"
          placeholder="Select theme"
          options={themes}
          labels={themesLabels}
          value={theme}
          onValueChange={changeTheme}
        />
        <SettingsSelect
          id="data"
          label="Data"
          placeholder="Select data type"
          options={dataKeys}
          labels={dataLabels}
          value={settings.data}
          onValueChange={handleDataChange}>
          <p className="mt-2 text-xs font-normal text-neutral-500">
            select what you want to see:&nbsp;
            <b>
              only platinums, only 100% completions or only ultra rare trophies
            </b>
          </p>
        </SettingsSelect>
        <SettingsSelect
          id="difficulty"
          label="Difficulty"
          placeholder="Select difficulty"
          options={difficultyKeys}
          labels={difficultyLabels}
          value={settings.difficulty}
          onValueChange={handleDifficultyChange}>
          <DifficultyHint />
        </SettingsSelect>
        <SettingsSwitch
          id="hide"
          label="Hide Profile"
          checked={settings.hide}
          onCheckedChange={handleHideChange}>
          <p className="text-xs font-normal text-neutral-500">
            enable this option to <b>blur your profile</b>, making the personal
            information visually obscured
          </p>
        </SettingsSwitch>
      </div>
      <DrawerFooter>
        <Button onClick={handleReset}>Reset settings</Button>
      </DrawerFooter>
    </>
  );
};

const SettingsContent = memo(Content);

const Component: FC = () => {
  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <Settings />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex-row">
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerDescription className="hidden">
            Settings drawer
          </DrawerDescription>
          <DrawerClose className="ml-auto">
            <X />
          </DrawerClose>
        </DrawerHeader>
        <SettingsContent />
      </DrawerContent>
    </Drawer>
  );
};

const SettingsDrawer = memo(Component);

export default SettingsDrawer;
