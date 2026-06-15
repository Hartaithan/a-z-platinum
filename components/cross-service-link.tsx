"use client";

import { capture } from "@/utils/analytics";
import Script from "next/script";
import { FC, useCallback } from "react";

const CrossServiceLink: FC = () => {
  const onLoad = useCallback(() => {
    document.addEventListener(
      "cross-service-link:ready",
      () => {
        const onLinkClick = (link: string) => capture("link-click", { link });
        const onLearnMoreClick = () => capture("learn-more-click");
        const onNeverShowClick = () => capture("never-show-click");
        const onCloseClick = () => capture("close-click");
        const widget = new window.CrossServiceLink({
          target: document.body,
          theme: "light",
          events: {
            onLinkClick,
            onLearnMoreClick,
            onNeverShowClick,
            onCloseClick,
          },
        });
        widget.mount();
      },
      { once: true },
    );
  }, []);
  return (
    <Script
      src="https://cross-service-link.vercel.app/loader.js"
      strategy="afterInteractive"
      onLoad={onLoad}
    />
  );
};

export default CrossServiceLink;
