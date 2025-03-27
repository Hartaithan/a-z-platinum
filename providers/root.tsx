"use client";

import DataProvider from "@/providers/data";
import type { FC, PropsWithChildren } from "react";

const RootProviders: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return <DataProvider>{children}</DataProvider>;
};

export default RootProviders;
