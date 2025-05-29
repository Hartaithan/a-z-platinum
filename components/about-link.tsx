"use client";

import { Button } from "@/ui/button";
import { MessageCircleWarning } from "lucide-react";
import { FC, useCallback } from "react";

const AboutLink: FC = () => {
  const handleClick = useCallback(() => {
    const section = document.getElementById("about");
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <Button unstyled onClick={handleClick}>
      <MessageCircleWarning />
    </Button>
  );
};

export default AboutLink;
