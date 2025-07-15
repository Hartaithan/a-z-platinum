"use client";

import { Device, Theme } from "@/models/app";
import AnalyticsProvider from "@/providers/analytics";
import CaptureProvider from "@/providers/capture";
import CongratulationProvider from "@/providers/congratulation";
import DataProvider from "@/providers/data";
import DeviceProvider from "@/providers/device";
import FeaturedProvider from "@/providers/featured";
import FiltersProvider from "@/providers/filters";
import SettingsProvider from "@/providers/settings";
import ThemeProvider from "@/providers/theme";
import type { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  defaultTheme: Theme;
  defaultDevice: Device;
}

const RootProviders: FC<Props> = (props) => {
  const { defaultTheme, defaultDevice, children } = props;
  return (
    <AnalyticsProvider>
      <DeviceProvider initial={defaultDevice}>
        <ThemeProvider defaultValue={defaultTheme}>
          <DataProvider>
            <FiltersProvider>
              <SettingsProvider>
                <FeaturedProvider>
                  <CaptureProvider>
                    <CongratulationProvider>{children}</CongratulationProvider>
                  </CaptureProvider>
                </FeaturedProvider>
              </SettingsProvider>
            </FiltersProvider>
          </DataProvider>
        </ThemeProvider>
      </DeviceProvider>
    </AnalyticsProvider>
  );
};

export default RootProviders;
