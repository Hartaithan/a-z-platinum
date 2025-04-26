"use client";

import SubmitProvider, { useSubmit } from "@/providers/submit";
import { Input } from "@/ui/input";
import { FC } from "react";

const Submit: FC = () => {
  const { onSubmit } = useSubmit();
  return (
    <form className="flex" onSubmit={onSubmit}>
      <Input
        name="id"
        className="rounded-none border-none bg-transparent p-0 font-bold shadow-none focus-visible:border-none focus-visible:ring-0"
        placeholder="Enter your PSN ID"
      />
    </form>
  );
};

const Wrapper: FC = () => (
  <SubmitProvider>
    <Submit />
  </SubmitProvider>
);

export default Wrapper;
