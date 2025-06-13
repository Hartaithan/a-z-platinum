"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import { FC, PropsWithChildren, useCallback } from "react";

interface Props extends PropsWithChildren {
  section: string;
  description: string;
}

const SectionLink: FC<Props> = (props) => {
  const { section, description, children } = props;

  const handleClick = useCallback(() => {
    const element = document.getElementById(section);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth" });
  }, [section]);

  return (
    <Tooltip>
      <TooltipTrigger onClick={handleClick}>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{description}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default SectionLink;
