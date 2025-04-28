import Alphabet from "@/components/alphabet";
import Header from "@/components/header";
import Progress from "@/components/progress";
import { FC } from "react";

const HomePage: FC = () => (
  <div className="flex flex-col">
    <Header />
    <Progress />
    <Alphabet />
  </div>
);

export default HomePage;
