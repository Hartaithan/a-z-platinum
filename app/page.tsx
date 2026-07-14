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
  <main className="flex flex-col">
    <Header />
    <CapturedArea>
      <Profile />
      <AlphabetProgress />
      <Alphabet />
      <LinkMessage />
    </CapturedArea>
    <FAQ />
    <About />
  </main>
);

export default HomePage;
