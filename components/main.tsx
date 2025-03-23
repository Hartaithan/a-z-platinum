"use client";

import Alphabet from "@/components/alphabet";
import Submit from "@/components/submit";
import { FC } from "react";

const Main: FC = () => (
  <div className="flex flex-col">
    <Submit />
    <Alphabet />
  </div>
);

export default Main;
