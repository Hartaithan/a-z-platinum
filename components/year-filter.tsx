"use client";

import { useFilters } from "@/providers/filters";
import { Button } from "@/ui/button";
import { cn } from "@/utils/styles";
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from "lucide-react";
import type { ComponentPropsWithoutRef, FC } from "react";

type Props = ComponentPropsWithoutRef<"div">;

const YearFilter: FC<Props> = (props) => {
  const { className, ...rest } = props;
  const { year, resetYear, handleYear } = useFilters();
  return (
    <div
      id="year-filter"
      className={cn("@capture::gap-2 relative flex gap-1 md:gap-2", className)}
      {...rest}>
      <Button
        unstyled
        className="@capture:hidden rounded"
        aria-label="Previous year"
        onClick={() => handleYear("prev")}>
        <ArrowLeftIcon className="size-4" />
      </Button>
      <div className="flex flex-col items-center leading-[normal]">
        <p className="@capture:text-base w-11 text-center text-sm font-bold md:text-base">
          {year ?? "All"}
        </p>
        <p className="@capture:text-sm text-xs text-gray-600 md:text-sm">
          Year
        </p>
      </div>
      <Button
        unstyled
        className="@capture:hidden rounded"
        aria-label="Next year"
        onClick={() => handleYear("next")}>
        <ArrowRightIcon className="size-4" />
      </Button>
      {year !== null && (
        <Button
          unstyled
          aria-label="Reset year filter"
          className="@capture:hidden border-input bg-secondary absolute -top-3 -right-0 flex size-5 items-center justify-center rounded-full border"
          onClick={resetYear}>
          <XIcon className="size-3" />
        </Button>
      )}
    </div>
  );
};

export default YearFilter;
