"use client";

import { Theme } from "@/models/app";
import DataProvider from "@/providers/data";
import ThemeProvider from "@/providers/theme";
import type { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  defaultTheme: Theme;
}

const RootProviders: FC<Props> = (props) => {
  const { defaultTheme, children } = props;
  return (
    <ThemeProvider defaultValue={defaultTheme}>
      <DataProvider>{children}</DataProvider>
    </ThemeProvider>
  );
};

export default RootProviders;
