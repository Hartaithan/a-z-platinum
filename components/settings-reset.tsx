import { useFeatured } from "@/providers/featured";
import { useSettings } from "@/providers/settings";
import { useTheme } from "@/providers/theme";
import { Button } from "@/ui/button";
import { FC, useCallback } from "react";

const SettingsReset: FC = () => {
  const { resetTheme } = useTheme();
  const { resetSettings } = useSettings();
  const { resetFeatured } = useFeatured();

  const handleReset = useCallback(() => {
    resetSettings();
    resetTheme();
    resetFeatured();
  }, [resetSettings, resetTheme, resetFeatured]);

  return <Button onClick={handleReset}>Reset settings</Button>;
};

export default SettingsReset;
