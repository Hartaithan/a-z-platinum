"use client";

import { Button } from "@/ui/button";
import { FC, PropsWithChildren, useCallback } from "react";

interface Props extends PropsWithChildren {
  section: string;
}

const SectionLink: FC<Props> = (props) => {
  const { section, children } = props;

  const handleClick = useCallback(() => {
    const element = document.getElementById(section);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth" });
  }, [section]);

  return (
    <Button unstyled onClick={handleClick}>
      {children}
    </Button>
  );
};

export default SectionLink;
