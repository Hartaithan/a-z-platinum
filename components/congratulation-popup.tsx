"use client";

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
import { XIcon } from "lucide-react";
import type { PropsWithChildren, Ref } from "react";
import { FC, useCallback, useImperativeHandle, useState } from "react";

interface Props extends DialogProps {
  ref: Ref<CongratulationPopupHandle>;
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
        className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg bg-transparent p-6 shadow-none duration-200 sm:max-w-sm">
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
};

const CongratulationPopup: FC<Props> = (props) => {
  const { ref, open: _, ...rest } = props;
  const [opened, setOpen] = useState<State>(true);

  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  useImperativeHandle(ref, () => ({
    open,
    close,
    toggle,
  }));

  return (
    <Dialog open={opened} {...rest}>
      <CongratulationContent>
        <DialogTitle className="hidden">Congratulation Popup</DialogTitle>
        <DialogDescription className="hidden">
          Congratulation Popup
        </DialogDescription>
        <div className="flex w-full justify-center gap-5">
          <pre className="text-white">Congratulation Popup</pre>
        </div>
        <Button
          unstyled
          variant="outline"
          className="fixed top-2 right-2"
          onClick={close}>
          <XIcon className="stroke-white" />
        </Button>
      </CongratulationContent>
    </Dialog>
  );
};

export default CongratulationPopup;
