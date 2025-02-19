import { FC } from "react";
import Alphabet from "./alphabet";
import Header from "./header";

const MainSection: FC = () => {
  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      <Header />
      <Alphabet />
    </main>
  );
};

export default MainSection;
