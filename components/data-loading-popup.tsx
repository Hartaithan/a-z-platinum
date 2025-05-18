"use client";

import ProgressSpinner from "@/components/progress-spinner";
import { getProgress } from "@/hooks/use-progress";
import { useData } from "@/providers/data";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/ui/dialog";
import { SpinnerBase } from "@/ui/spinner";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { DialogProps } from "@radix-ui/react-dialog";
import { CircleCheckIcon } from "lucide-react";
import type { Dispatch, PropsWithChildren, Ref, SetStateAction } from "react";
import { FC, useCallback, useImperativeHandle, useState } from "react";

interface Props extends DialogProps {
  ref: Ref<DataLoadingPopupHandle>;
  handleAbort: () => void;
}

export interface DataLoadingPopupHandle {
  setPages: Dispatch<SetStateAction<Pages>>;
  reset: () => void;
}

export interface Pages {
  current: number;
  total: number;
}

const defaultPages: Pages = { current: 0, total: 10 };

const DataLoadingContent: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg bg-transparent p-6 shadow-none duration-200 sm:max-w-sm"
        onOpenAutoFocus={(e) => e.preventDefault()}>
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
};

const DataLoadingPopup: FC<Props> = (props) => {
  const { ref, handleAbort, ...rest } = props;
  const { status } = useData();
  const [pages, setPages] = useState<Pages>(defaultPages);

  const handleReset = useCallback(() => setPages(defaultPages), []);

  useImperativeHandle(ref, () => ({
    setPages,
    reset: handleReset,
  }));

  const open = status !== "idle" && status !== "completed";

  return (
    <Dialog open={open} {...rest}>
      <DataLoadingContent>
        <DialogTitle className="hidden">Data Loading Popup</DialogTitle>
        <DialogDescription className="hidden">
          Data Loading Popup
        </DialogDescription>
        <div className="flex w-full justify-center gap-5">
          <div className="flex flex-col items-center text-white">
            {status === "profile-loading" ? (
              <ProgressSpinner />
            ) : (
              <CircleCheckIcon className="size-24" />
            )}
            <p className="mt-2 text-xl font-bold">Profile</p>
          </div>
          <div className="flex flex-col items-center text-white">
            {status === "platinums-loading" ? (
              <ProgressSpinner>
                <p className="text-xl font-bold">
                  {getProgress(pages.current, pages.total).label}
                </p>
              </ProgressSpinner>
            ) : (
              <SpinnerBase className="size-24 p-1" />
            )}
            <p className="mt-2 text-xl font-bold">Platinums</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="h-8 w-10/12 justify-self-center font-semibold text-white"
          onClick={handleAbort}>
          Cancel
        </Button>
      </DataLoadingContent>
    </Dialog>
  );
};

export default DataLoadingPopup;
