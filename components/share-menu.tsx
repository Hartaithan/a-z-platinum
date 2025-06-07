"use client";

import ImageUploadPopup, {
  ImageUploadPopupHandle,
} from "@/components/image-upload-popup";
import { useCapture } from "@/providers/capture";
import { useData } from "@/providers/data";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { readError } from "@/utils/error";
import { uploadImage } from "@/utils/upload";
import { SaveIcon, Share2Icon, UploadIcon } from "lucide-react";
import { useCallback, useRef, type FC } from "react";
import { toast } from "sonner";

const ShareMenu: FC = () => {
  const { profile } = useData();
  const { capture } = useCapture();
  const popupRef = useRef<ImageUploadPopupHandle>(null);
  const { upload } = popupRef.current ?? {};

  const handleSave = useCallback(async () => {
    try {
      const image = await capture();
      if (!image) throw new Error("Unable to generate image");
      const link = document.createElement("a");
      link.href = URL.createObjectURL(image);
      link.download = `${profile?.name ?? "a-z platinum challenge"}.png`;
      link.click();
      link.remove();
    } catch (error) {
      console.error("save error", error);
      const message = readError(error);
      toast.error(message);
    }
  }, [profile?.name, capture]);

  const handleUpload = useCallback(async () => {
    try {
      upload?.open();
      const image = await capture();
      if (!image) throw new Error("Unable to generate image");
      upload?.set({ status: "upload" });
      const response = await uploadImage(image, profile?.name);
      if (!response.success) throw new Error(response.message);
      upload?.set({ status: "complete", image: response.link });
    } catch (error) {
      console.error("upload error", error);
      const message = readError(error);
      upload?.set({ status: "error", error: message });
      toast.error(message);
    }
  }, [profile?.name, capture, upload]);

  return (
    <>
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
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleSave} aria-label="Save as PNG">
            <SaveIcon className="text-primary" />
            <span>Save as PNG</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleUpload} aria-label="Upload image">
            <UploadIcon className="text-primary" />
            <span>Upload image</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ImageUploadPopup ref={popupRef} />
    </>
  );
};

export default ShareMenu;
