"use client";

import { DeviceProps } from "@/models/app";
import { useShare } from "@/providers/share";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { SaveIcon, Share2Icon, UploadIcon } from "lucide-react";
import { type FC } from "react";

const MenuItems: FC = () => {
  const { handleSave, handleUpload } = useShare();
  return (
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
  );
};

const ShareMenu: FC<DeviceProps> = (props) => {
  const { device = "desktop" } = props;
  if (device === "mobile") return <MenuItems />;
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
        <MenuItems />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareMenu;
