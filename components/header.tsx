import Submit from "@/components/submit";
import { CircleUserRound, Settings } from "lucide-react";
import { FC } from "react";

const Header: FC = () => (
  <div className="border-b py-3">
    <div className="container flex flex-nowrap items-center gap-3">
      <CircleUserRound />
      <Submit />
      <Settings />
    </div>
  </div>
);

export default Header;
