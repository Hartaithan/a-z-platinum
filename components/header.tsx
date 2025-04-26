import Submit from "@/components/submit";
import { Settings } from "lucide-react";
import { FC } from "react";

const Header: FC = () => (
  <div className="border-b py-3">
    <div className="container flex items-center justify-between">
      <Submit />
      <Settings />
    </div>
  </div>
);

export default Header;
