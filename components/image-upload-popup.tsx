"use client";

import { Button } from "@/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/ui/dialog";
import { Spinner } from "@/ui/spinner";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { DialogProps } from "@radix-ui/react-dialog";
import type { FC, PropsWithChildren, Ref } from "react";
import { useCallback, useImperativeHandle, useState } from "react";

export type UploadStatus = "generate" | "upload" | "complete" | "error";

interface UploadState {
  opened: boolean;
  status: UploadStatus;
  error: string | null;
  image: string | null;
}

type StatusHandler = (params: Partial<UploadState>) => void;

interface Props extends DialogProps {
  ref: Ref<ImageUploadPopupHandle>;
  abort: () => void;
}

export interface ImageUploadPopupHandle {
  open: () => void;
  close: () => void;
  set: StatusHandler;
}

const defaultState: UploadState = {
  opened: false,
  status: "generate",
  error: null,
  image: null,
};

const DataLoadingContent: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay className="bg-black/75" />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg bg-transparent p-6 shadow-none duration-200 focus:outline-none sm:max-w-sm">
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
};

const ImageUploadPopup: FC<Props> = (props) => {
  const { ref, abort, ...rest } = props;
  const [state, setState] = useState<UploadState>(defaultState);
  const { opened, status, error, image } = state;
  const isLoading = status === "generate" || status === "upload";

  const open = useCallback(() => {
    setState((prev) => ({ ...prev, opened: true }));
  }, []);

  const close = useCallback(() => {
    setState(defaultState);
  }, []);

  const set: StatusHandler = useCallback((params) => {
    setState((prev) => ({ ...prev, ...params }));
  }, []);

  useImperativeHandle(ref, () => ({ open, close, set }));

  return (
    <Dialog open={opened} {...rest}>
      <DataLoadingContent>
        <DialogTitle className="hidden">Image Upload Popup</DialogTitle>
        <DialogDescription className="hidden">
          Image Upload Popup
        </DialogDescription>
        <div className="flex w-full flex-col items-center justify-center text-white">
          <div className="flex items-center">
            {isLoading && <Spinner className="mr-2 size-4" />}
            <p className="text-lg font-medium">
              {status === "generate" && "Generating..."}
              {status === "upload" && "Uploading..."}
              {status === "complete" && "Ready!"}
              {status === "error" && "Oops!"}
            </p>
          </div>
          <p className="text-center">
            {status === "generate" && "The image is being created..."}
            {status === "upload" && "The image is uploading..."}
            {status === "complete" && "All done! Your link should be below."}
            {status === "error" && (error || "Something went wrong.")}
          </p>
          {image && (
            <a
              className="my-4 text-center text-lg font-medium underline"
              href={image}
              target="_blank">
              {image}
            </a>
          )}
          {status === "upload" && (
            <Button
              variant="outline"
              aria-label="Cancel image upload"
              className="mt-3 h-8 w-10/12 justify-self-center font-semibold text-white"
              onClick={abort}>
              Cancel
            </Button>
          )}
          {!isLoading && (
            <Button
              variant="outline"
              aria-label="Close image upload modal"
              className="mt-3 h-8 w-10/12 justify-self-center font-semibold text-white"
              onClick={close}>
              Close
            </Button>
          )}
        </div>
      </DataLoadingContent>
    </Dialog>
  );
};

export default ImageUploadPopup;
