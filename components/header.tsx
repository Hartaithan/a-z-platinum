import SectionLink from "@/components/section-link";
import SettingsDrawer from "@/components/settings-drawer";
import ShareMenu from "@/components/share-menu";
import Submit from "@/components/submit";
import { CircleHelp, CircleUserRound, Info } from "lucide-react";
import { FC } from "react";

const Header: FC = () => (
  <header className="border-b py-3">
    <div className="container flex flex-nowrap items-center gap-3">
      <CircleUserRound />
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

export default Header;
