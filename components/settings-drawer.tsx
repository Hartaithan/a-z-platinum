"use client";

import { letterSetsKeys, letterSetsLabels } from "@/constants/alphabet";
import { dataKeys, dataLabels, themes, themesLabels } from "@/constants/app";
import { useSettings } from "@/providers/settings";
import { useTheme } from "@/providers/theme";
import { Button } from "@/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/ui/drawer";
import { Label } from "@/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Settings, X } from "lucide-react";
import { FC, memo, useCallback } from "react";

const Component: FC = () => {
  const { theme, changeTheme, resetTheme } = useTheme();
  const { settings, handleDataChange, handleLettersChange, resetSettings } =
    useSettings();

  const handleReset = useCallback(() => {
    resetSettings();
    resetTheme();
  }, [resetSettings, resetTheme]);

  return (
    <Drawer direction="right">
      <DrawerTrigger className="cursor-pointer">
        <Settings />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex-row">
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerClose className="ml-auto">
            <X />
          </DrawerClose>
        </DrawerHeader>
        <div className="flex flex-col space-y-4 p-4 pt-2">
          <div className="flex flex-col">
            <Label className="mb-1 text-sm font-semibold" htmlFor="theme">
              Theme
            </Label>
            <Select value={theme} onValueChange={changeTheme}>
              <SelectTrigger id="theme" className="w-full">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                {themes.map((theme) => (
                  <SelectItem key={theme} value={theme}>
                    {themesLabels[theme]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col">
            <Label className="mb-1 text-sm font-semibold" htmlFor="data">
              Data
            </Label>
            <Select value={settings.data} onValueChange={handleDataChange}>
              <SelectTrigger id="data" className="w-full">
                <SelectValue placeholder="Select data type" />
              </SelectTrigger>
              <SelectContent>
                {dataKeys.map((theme) => (
                  <SelectItem key={theme} value={theme}>
                    {dataLabels[theme]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="mt-2 text-xs font-normal text-neutral-500">
              select what you want to see:&nbsp;
              <b>
                only platinums, only 100% completions or only ultra rare
                trophies
              </b>
            </p>
          </div>
          <div className="flex flex-col">
            <Label className="mb-1 text-sm font-semibold" htmlFor="letters">
              Letter Set
            </Label>
            <Select
              value={settings.letters}
              onValueChange={handleLettersChange}>
              <SelectTrigger id="letters" className="w-full">
                <SelectValue placeholder="Select letter set" />
              </SelectTrigger>
              <SelectContent>
                {letterSetsKeys.map((theme) => (
                  <SelectItem key={theme} value={theme}>
                    {letterSetsLabels[theme]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="mt-2 text-xs font-normal text-neutral-500">
              select what letter set you wanna use:&nbsp;
              <b>
                only letters, with numbers, with special characters or with
                asian characters
              </b>
            </p>
          </div>
        </div>
        <DrawerFooter>
          <Button onClick={handleReset}>Reset settings</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const SettingsDrawer = memo(Component);

export default SettingsDrawer;
