import Alphabet from "@/components/alphabet";
import Header from "@/components/header";
import { FC } from "react";

const HomePage: FC = () => (
  <div className="flex flex-col">
    <Header />
    <Alphabet />
  </div>
);

export default HomePage;
