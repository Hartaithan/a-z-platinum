"use client";

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
import { SaveIcon, Share2Icon, UploadIcon } from "lucide-react";
import { useCallback, type FC } from "react";
import { toast } from "sonner";

const ShareMenu: FC = () => {
  const { profile } = useData();
  const { capture } = useCapture();

  const handleSave = useCallback(async () => {
    try {
      const image = await capture();
      if (!image) throw new Error("Unable to generate image");
      const link = document.createElement("a");
      link.href = URL.createObjectURL(image);
      link.download = `${profile?.name ?? "calendar"}.png`;
      link.click();
      link.remove();
    } catch (error) {
      console.error("save error", error);
      const message = readError(error);
      toast.error(message);
    }
  }, [profile?.name, capture]);

  const handleUpload = useCallback(async () => {
    // TODO: add image upload
  }, []);

  return (
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
  );
};

export default ShareMenu;
