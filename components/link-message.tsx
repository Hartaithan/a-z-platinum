import { getLinkMessage } from "@/utils/link";
import type { FC } from "react";

const LinkMessage: FC = () => {
  const { message, href, link } = getLinkMessage();
  return (
    <span className="@capture:block container hidden text-right font-medium">
      {message}&nbsp;
      <a
        className="visited:text-foreground hover:text-foreground font-semibold"
        target="_blank"
        href={href}>
        {link}
      </a>
    </span>
  );
};

export default LinkMessage;
