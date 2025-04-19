"use client";

import SubmitProvider, { useSubmit } from "@/providers/submit";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { SendHorizontalIcon } from "lucide-react";
import { FC } from "react";

const Submit: FC = () => {
  const { onSubmit } = useSubmit();
  return (
    <form className="mb-4 flex min-w-96 items-center gap-2" onSubmit={onSubmit}>
      <Input name="id" placeholder="Enter your PSN ID" />
      <Button type="submit" variant="outline">
        <SendHorizontalIcon className="size-5" />
      </Button>
    </form>
  );
};

const Wrapper: FC = () => (
  <SubmitProvider>
    <Submit />
  </SubmitProvider>
);

export default Wrapper;
