import AboutLink from "@/components/about-link";
import SettingsDrawer from "@/components/settings-drawer";
import ShareMenu from "@/components/share-menu";
import Submit from "@/components/submit";
import { CircleUserRound } from "lucide-react";
import { FC } from "react";

const Header: FC = () => (
  <header className="border-b py-3">
    <div className="container flex flex-nowrap items-center gap-3">
      <CircleUserRound />
      <Submit />
      <ShareMenu />
      <AboutLink />
      <SettingsDrawer />
    </div>
  </header>
);

export default Header;
