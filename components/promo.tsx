"use client";

import { promoKey } from "@/constants/storage";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Button } from "@/ui/button";
import { capture } from "@/utils/analytics";
import posthog from "posthog-js";
import type { MouseEventHandler } from "react";
import { useCallback, type FC } from "react";

interface ContentProps {
  hidePromo: () => void;
}

const styles = {
  button:
    "h-6 text-xs py-1 bg-emerald-700 hover:bg-emerald-800 hover:text-emerald-200",
};

const Content: FC<ContentProps> = (props) => {
  const { hidePromo } = props;

  const handleLink: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (event) => {
      const target = event.target as HTMLAnchorElement;
      const { href = "link not found" } = target;
      capture("promo-link-click", { href });
    },
    [],
  );

  return (
    <div className="animate-fade-in bg-card text-card-foreground fixed top-auto right-3 bottom-20 z-10 w-11/12 max-w-[340px] rounded-lg border-2 border-emerald-700/50 px-4 py-3 shadow-sm 2xl:top-16 2xl:right-3 2xl:bottom-auto">
      <h1 className="text-sm font-medium text-emerald-900">
        Looking for a Platinum Calendar app?
      </h1>
      <div className="mt-1 flex flex-wrap items-center gap-2">
        <Button className={styles.button} asChild>
          <a
            href="https://platinum-calendar.vercel.app/"
            target="_blank"
            onClick={handleLink}>
            Visit Website
          </a>
        </Button>
        <Button
          variant="link"
          className="h-auto p-0 text-xs text-emerald-900"
          onClick={hidePromo}>
          Don&apos;t show this again
        </Button>
      </div>
    </div>
  );
};

const Promo: FC = () => {
  const [isPromoVisible, setPromoVisible] = useLocalStorage({
    key: promoKey,
    defaultValue: true,
  });

  const hidePromo = useCallback(() => {
    posthog.capture("promo-hide");
    setPromoVisible(false);
  }, [setPromoVisible]);

  if (!isPromoVisible) return null;

  return <Content hidePromo={hidePromo} />;
};

export default Promo;
