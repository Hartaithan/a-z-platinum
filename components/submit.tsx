"use client";

import SubmitProvider, { useSubmit } from "@/providers/submit";
import { Input } from "@/ui/input";
import { FC } from "react";

const Submit: FC = () => {
  const { onSubmit } = useSubmit();
  return (
    <form className="flex w-full" onSubmit={onSubmit}>
      <Input
        name="id"
        className="h-auto min-w-auto grow rounded-none border-none bg-transparent p-0 text-sm font-bold shadow-none focus-visible:ring-0 md:text-base"
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
