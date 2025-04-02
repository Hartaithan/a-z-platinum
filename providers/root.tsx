"use client";

import { Theme } from "@/models/app";
import DataProvider from "@/providers/data";
import FiltersProvider from "@/providers/filters";
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
        <FiltersProvider>{children}</FiltersProvider>
      </DataProvider>
    </ThemeProvider>
  );
};

export default RootProviders;
