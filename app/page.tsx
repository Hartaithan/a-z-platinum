import Alphabet from "@/components/alphabet";
import Submit from "@/components/submit";
import { FC } from "react";

const HomePage: FC = () => (
  <div className="flex flex-col items-center justify-center py-3">
    <Submit />
    <Alphabet />
  </div>
);

export default HomePage;
