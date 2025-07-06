"use client";

import { DeviceProps } from "@/models/app";
import { DropdownMenuItem } from "@/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import { FC, PropsWithChildren, useCallback } from "react";

interface Props extends PropsWithChildren, DeviceProps {
  section: string;
  description: string;
}

const SectionLink: FC<Props> = (props) => {
  const { section, description, device = "desktop", children } = props;

  const handleClick = useCallback(() => {
    const element = document.getElementById(section);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth" });
  }, [section]);

  if (device === "mobile") {
    return (
      <DropdownMenuItem onClick={handleClick}>{children}</DropdownMenuItem>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger className="flex" onClick={handleClick}>
        {children}
      </TooltipTrigger>
      <TooltipContent>
        <p>{description}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default SectionLink;
