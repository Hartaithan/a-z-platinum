"use client";

import DataHint from "@/components/data-hint";
import DifficultyHint from "@/components/difficulty-hint";
import FeaturedReset from "@/components/featured-reset";
import SettingsReset from "@/components/settings-reset";
import SettingsSelect from "@/components/settings-select";
import SettingsSwitch from "@/components/settings-switch";
import { difficultyKeys, difficultyLabels } from "@/constants/alphabet";
import { dataKeys, dataLabels, themes, themesLabels } from "@/constants/app";
import { useSettings } from "@/providers/settings";
import { useTheme } from "@/providers/theme";
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
import { FC, memo } from "react";

const Content: FC = () => {
  const { theme, changeTheme } = useTheme();
  const { settings, setDataSetting, setDifficultySetting, setHideSetting } =
    useSettings();

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
          onValueChange={setDataSetting}>
          <DataHint />
        </SettingsSelect>
        <SettingsSelect
          id="difficulty"
          label="Difficulty"
          placeholder="Select difficulty"
          options={difficultyKeys}
          labels={difficultyLabels}
          value={settings.difficulty}
          onValueChange={setDifficultySetting}>
          <DifficultyHint />
        </SettingsSelect>
        <SettingsSwitch
          id="hide"
          label="Hide Profile"
          checked={settings.hide}
          onCheckedChange={setHideSetting}>
          <p className="text-xs font-normal text-neutral-500">
            enable this option to <b>blur your profile</b>, making the personal
            information visually obscured
          </p>
        </SettingsSwitch>
        <FeaturedReset />
      </div>
      <DrawerFooter>
        <SettingsReset />
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
