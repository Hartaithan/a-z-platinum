import Alphabet from "@/components/alphabet";
import Submit from "@/components/submit";
import YearFilter from "@/components/year-filter";
import { FC } from "react";

const HomePage: FC = () => (
  <div className="flex flex-col items-center justify-center py-3">
    <div className="flex gap-2">
      <Submit />
      <YearFilter />
    </div>
    <Alphabet />
  </div>
);

export default HomePage;
