import About from "@/components/about";
import Alphabet from "@/components/alphabet";
import AlphabetProgress from "@/components/alphabet-progress";
import CapturedArea from "@/components/captured-area";
import FAQ from "@/components/faq";
import Header from "@/components/header";
import LinkMessage from "@/components/link-message";
import Profile from "@/components/profile";
import { FC } from "react";

const HomePage: FC = () => (
  <div className="flex flex-col">
    <Header />
    <CapturedArea>
      <Profile />
      <AlphabetProgress />
      <Alphabet />
      <LinkMessage />
    </CapturedArea>
    <FAQ />
    <About />
  </div>
);

export default HomePage;
