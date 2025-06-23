"use client";

import { useData } from "@/providers/data";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { DialogProps } from "@radix-ui/react-dialog";
import { PartyPopper } from "lucide-react";
import type { PropsWithChildren, Ref } from "react";
import { FC, useCallback, useImperativeHandle, useState } from "react";

interface Props extends DialogProps {
  ref: Ref<CongratulationPopupHandle>;
  onClose?: () => void;
}

type State = boolean;

export interface CongratulationPopupHandle {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const CongratulationContent: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay className="bg-black/75" />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed inset-0 z-50 flex size-full flex-col items-center justify-center bg-transparent p-6 text-white shadow-none outline-0 duration-200">
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
};

const CongratulationPopup: FC<Props> = (props) => {
  const { ref, onClose, open: _, ...rest } = props;
  const [opened, setOpen] = useState<State>(false);
  const { profile } = useData();

  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  const handleClose = useCallback(() => {
    close();
    onClose?.();
  }, [close, onClose]);

  useImperativeHandle(ref, () => ({
    open,
    close,
    toggle,
  }));

  return (
    <Dialog open={opened} {...rest}>
      <CongratulationContent>
        <DialogTitle className="text-4xl">
          Congratulations <b>{profile?.name}</b>!
        </DialogTitle>
        <DialogDescription className="mt-2 text-lg text-white">
          You&apos;ve completed the A-Z Platinum Challenge!
        </DialogDescription>
        <PartyPopper className="mt-6 h-24 w-24 animate-pulse" />
        <p className="mt-4 max-w-4/12 text-center">
          You&apos;ve achieved the impossible - a Platinum trophy for every
          letter of the alphabet! Your dedication and skill are truly
          remarkable.
        </p>
        <Button
          variant="outline"
          className="te mt-6 px-5 font-semibold"
          onClick={handleClose}>
          Continue
        </Button>
      </CongratulationContent>
    </Dialog>
  );
};

export default CongratulationPopup;
