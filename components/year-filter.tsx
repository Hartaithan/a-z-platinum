"use client";

import { useFilters } from "@/providers/filters";
import { Button } from "@/ui/button";
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from "lucide-react";
import type { FC } from "react";

const YearFilter: FC = () => {
  const { year, resetYear, handleYear } = useFilters();
  return (
    <div
      id="year-filter"
      className="border-input bg-secondary relative flex h-full min-w-full items-center justify-center rounded-md border px-3 py-2 md:min-w-[auto]">
      <Button
        unstyled
        className="rounded"
        aria-label="Previous year"
        onClick={() => handleYear("prev")}>
        <ArrowLeftIcon className="size-4" />
      </Button>
      <p className="w-16 cursor-default text-center text-sm leading-[normal]">
        {year ?? "All"}
      </p>
      <Button
        unstyled
        className="rounded"
        aria-label="Next year"
        onClick={() => handleYear("next")}>
        <ArrowRightIcon className="size-4" />
      </Button>
      {year !== null && (
        <Button
          unstyled
          aria-label="Reset year filter"
          className="border-input bg-secondary absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full border"
          onClick={resetYear}>
          <XIcon className="size-3" />
        </Button>
      )}
    </div>
  );
};

export default YearFilter;
