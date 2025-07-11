"use client";

import { attachMediaListener } from "@/hooks/use-media-query";
import { Device } from "@/models/app";
import type { FC, PropsWithChildren } from "react";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface Context {
  type: Device;
  isDesktop: boolean;
  isMobile: boolean;
}

const initialValue: Context = {
  type: "mobile",
  isDesktop: false,
  isMobile: true,
};

interface Props extends PropsWithChildren {
  initial: Device;
}

const Context = createContext<Context>(initialValue);

const DeviceProvider: FC<Props> = (props) => {
  const { initial, children } = props;
  const [type, setType] = useState<Device>(initial);
  const queryRef = useRef<MediaQueryList>(null);

  const isDesktop = type === "desktop";
  const isMobile = type === "mobile";

  const exposed: Context = useMemo(
    () => ({ type, isDesktop, isMobile }) satisfies Context,
    [isDesktop, isMobile, type],
  );

  useEffect(() => {
    if ("matchMedia" in window === false) return;
    queryRef.current = window.matchMedia("(min-width: 768px)");
    setType(queryRef.current.matches ? "desktop" : "mobile");
    return attachMediaListener(queryRef.current, (event) =>
      setType(event.matches ? "desktop" : "mobile"),
    );
  }, []);

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useDevice = (): Context => useContext(Context);

export default DeviceProvider;
