"use client";

import { Theme } from "@/models/app";
import CaptureProvider from "@/providers/capture";
import DataProvider from "@/providers/data";
import FeaturedProvider from "@/providers/featured";
import FiltersProvider from "@/providers/filters";
import SettingsProvider from "@/providers/settings";
import ThemeProvider from "@/providers/theme";
import type { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  defaultTheme: Theme;
}

const RootProviders: FC<Props> = (props) => {
  const { defaultTheme, children } = props;
  return (
    <ThemeProvider defaultValue={defaultTheme}>
      <DataProvider>
        <FiltersProvider>
          <SettingsProvider>
            <FeaturedProvider>
              <CaptureProvider>{children}</CaptureProvider>
            </FeaturedProvider>
          </SettingsProvider>
        </FiltersProvider>
      </DataProvider>
    </ThemeProvider>
  );
};

export default RootProviders;
