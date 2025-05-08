"use client";

import { themes, themesLabels } from "@/constants/app";
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

  const handleReset = useCallback(() => {
    resetTheme();
  }, [resetTheme]);

  return (
    <Drawer direction="right">
      <DrawerTrigger>
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
