import { getDeviceType } from "@/actions/device";
import { getTheme } from "@/actions/theme";
import "@/app/globals.css";
import Promo from "@/components/promo";
import { APP_URL } from "@/constants/variables";
import RootProviders from "@/providers/root";
import { Toaster } from "@/ui/sonner";
import { cn } from "@/utils/styles";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { FC, PropsWithChildren } from "react";

const font = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export const metadata: Metadata = {
  title: "A-Z Platinum Challenge",
  description:
    "Track and complete your A-Z platinum challenge. A unique challenge for true completionists!",
  applicationName: "A-Z Platinum Challenge",
  twitter: { card: "summary_large_image" },
  keywords: [
    "a-z",
    "a-z challenge",
    "a to z challenge",
    "alphabet challenge",
    "platinum challenge",
    "trophy alphabet",
    "infographic",
    "gaming infographic",
    "trophy infographic",
    "trophy",
    "trophies",
    "rare trophies",
    "trophy tracking",
    "gaming",
    "platinum",
    "playstation",
    "playstation trophies",
    "trophy hunting",
    "psn trophies",
    "ps5 platinum",
    "ps4 platinum",
    "trophy goals",
    "platinum goals",
    "trophy milestones",
    "platinum milestones",
    "psn profile",
    "trophy list",
    "platinum list",
    "trophy generator",
    "platinum generator",
    "platinum timeline",
    "trophy stats",
    "platinum stats",
    "completionist",
  ],
  robots: "all",
  metadataBase: new URL(APP_URL),
};

const RootLayout: FC<PropsWithChildren> = async (props) => {
  const { children } = props;
  const [theme, device] = await Promise.all([getTheme(), getDeviceType()]);
  return (
    <html lang="en" data-theme={theme} data-device={device}>
      <body className={cn(font.variable, "antialiased")}>
        <RootProviders defaultTheme={theme} defaultDevice={device}>
          {children}
        </RootProviders>
        <Toaster theme="light" position="top-right" richColors closeButton />
        <Promo />
      </body>
    </html>
  );
};

export default RootLayout;
