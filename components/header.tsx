"use client";

import SectionLink from "@/components/section-link";
import SettingsDrawer from "@/components/settings-drawer";
import ShareMenu from "@/components/share-menu";
import Submit from "@/components/submit";
import { useDevice } from "@/providers/device";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { CircleHelp, CircleUserRound, Info, Menu } from "lucide-react";
import { FC } from "react";

const DesktopHeader: FC = () => {
  return (
    <header id="desktop" className="border-b py-3">
      <div className="container flex flex-nowrap items-center gap-3">
        <CircleUserRound className="min-w-6" />
        <Submit />
        <ShareMenu />
        <SectionLink section="faq" description="Frequently asked questions">
          <CircleHelp />
        </SectionLink>
        <SectionLink section="about" description="Learn more about the project">
          <Info />
        </SectionLink>
        <SettingsDrawer />
      </div>
    </header>
  );
};

const MobileHeader: FC = () => {
  return (
    <header
      id="mobile"
      className="bg-background fixed bottom-0 z-30 flex h-16 w-full items-center gap-4 rounded-t-md px-4 shadow-2xl shadow-black">
      <CircleUserRound className="min-w-6" />
      <Submit />
      <SettingsDrawer />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={24} id="dropdown-full-width">
          <ShareMenu device="mobile" />
          <SectionLink
            device="mobile"
            section="faq"
            description="Frequently asked questions">
            <CircleHelp className="text-primary" />
            <span>FAQ</span>
          </SectionLink>
          <SectionLink
            device="mobile"
            section="about"
            description="Learn more about the project">
            <Info className="text-primary" />
            <span>About</span>
          </SectionLink>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

const Header: FC = () => {
  const { isDesktop } = useDevice();
  if (isDesktop) return <DesktopHeader />;
  return <MobileHeader />;
};

export default Header;
