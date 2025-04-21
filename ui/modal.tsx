"use client";

import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { XIcon } from "lucide-react";
import * as React from "react";

export interface ModalState<T = null> {
  data?: T;
  isVisible: boolean;
}

export interface ModalProps<T = null>
  extends React.PropsWithChildren,
    ModalState<T> {
  onClose: (value: boolean) => void;
  title?: string;
  description?: string;
}

function Modal({
  isVisible,
  title,
  description,
  children,
  onClose,
}: ModalProps) {
  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100%-1.5rem)] rounded-lg px-4 py-3 md:w-full">
        <DialogHeader className="space-y-3">
          {title && (
            <DialogTitle className="w-full text-center text-sm font-medium md:text-base">
              {title}
            </DialogTitle>
          )}
          <DialogDescription className="hidden">
            {description ?? "Modal"}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

function ModalCloseButton(props: React.ComponentProps<"button">) {
  return (
    <Button aria-label="Close modal" {...props}>
      <XIcon />
      <span>Close</span>
    </Button>
  );
}

export { Modal, ModalCloseButton };
