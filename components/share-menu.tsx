"use client";

import ImageUploadPopup, {
  ImageUploadPopupHandle,
} from "@/components/image-upload-popup";
import { useAbortController } from "@/hooks/use-abort-controller";
import { DeviceProps } from "@/models/app";
import { useCapture } from "@/providers/capture";
import { useData } from "@/providers/data";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { API } from "@/utils/api";
import { readError } from "@/utils/error";
import { downloadImage, isImagesLoading } from "@/utils/image";
import { getUploadFormData } from "@/utils/upload";
import { SaveIcon, Share2Icon, UploadIcon } from "lucide-react";
import { useCallback, useMemo, useRef, type FC } from "react";
import { toast } from "sonner";

const messages = {
  cancel: "Image upload was canceled by the user",
  generate: "Unable to generate image",
};

const ShareMenu: FC<DeviceProps> = (props) => {
  const { device = "desktop" } = props;
  const { profile } = useData();
  const { capture } = useCapture();
  const { abort, getSignal } = useAbortController({ message: messages.cancel });
  const popupRef = useRef<ImageUploadPopupHandle>(null);

  const handleSave = useCallback(async () => {
    try {
      if (isImagesLoading()) return;
      const image = await capture();
      if (!image) throw new Error(messages.generate);
      downloadImage(image, profile?.name);
    } catch (error) {
      console.error("save error", error);
      const message = readError(error);
      toast.error(message);
    }
  }, [profile?.name, capture]);

  const handleUpload = useCallback(async () => {
    const { set, open, close } = popupRef.current ?? {};
    const signal = getSignal();
    try {
      if (isImagesLoading()) return;
      open?.();
      const image = await capture();
      if (!image) throw new Error(messages.generate);
      set?.({ status: "upload" });
      const psnId = profile?.name ?? "A-Z Platinum Challenge";
      const body = getUploadFormData(image, psnId);
      const response = await API.uploadImage({ body, signal });
      if (!response.success) throw new Error(response.message);
      set?.({ status: "complete", image: response.link });
    } catch (error) {
      console.error("upload error", error);
      const message = readError(error);
      toast.error(message);
      if (signal.aborted) close?.();
      else set?.({ status: "error", error: message });
    }
  }, [capture, profile?.name, getSignal]);

  const items = useMemo(
    () => (
      <>
        <DropdownMenuItem onClick={handleSave} aria-label="Save as PNG">
          <SaveIcon className="text-primary" />
          <span>Save as PNG</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleUpload} aria-label="Upload image">
          <UploadIcon className="text-primary" />
          <span>Upload image</span>
        </DropdownMenuItem>
      </>
    ),
    [handleSave, handleUpload],
  );

  return (
    <>
      {device === "mobile" && items}
      {device === "desktop" && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              id="share-menu"
              className="mr-2 inline-flex items-center justify-center gap-2 font-medium"
              unstyled
              aria-label="Share">
              <Share2Icon className="text-primary" />
              <span>Share</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>{items}</DropdownMenuContent>
        </DropdownMenu>
      )}
      <ImageUploadPopup ref={popupRef} abort={abort} />
    </>
  );
};

export default ShareMenu;
