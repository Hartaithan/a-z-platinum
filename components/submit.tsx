"use client";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { SendHorizontalIcon } from "lucide-react";
import { FC } from "react";

const Submit: FC = () => {
  return (
    <form className="mb-4 flex items-center gap-2">
      <Input name="id" placeholder="Enter your PSN ID" />
      <Button type="submit" variant="outline">
        <SendHorizontalIcon className="size-5" />
      </Button>
    </form>
  );
};

export default Submit;
