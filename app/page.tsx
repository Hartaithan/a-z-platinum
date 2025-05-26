import About from "@/components/about";
import Alphabet from "@/components/alphabet";
import AlphabetProgress from "@/components/alphabet-progress";
import Header from "@/components/header";
import Profile from "@/components/profile";
import { FC } from "react";

const HomePage: FC = () => (
  <div className="flex flex-col">
    <Header />
    <Profile />
    <AlphabetProgress />
    <Alphabet />
    <About />
  </div>
);

export default HomePage;
