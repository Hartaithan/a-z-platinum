import { Platform } from "@/models/platinum";
import { FC } from "react";

interface TagProps {
  platform: Platform;
}

export const PlatformTag: FC<TagProps> = (props) => {
  const { platform } = props;
  return (
    <span className="rounded-full border border-neutral-300 bg-neutral-100 px-2 py-0.5 text-xs font-medium">
      {platform}
    </span>
  );
};

interface TagsProps {
  platforms: Platform[] | undefined | null;
}

const PlatformTags: FC<TagsProps> = (props) => {
  const { platforms } = props;
  if (!platforms || platforms?.length === 0) return null;
  return (
    <>
      {platforms.map((platform) => (
        <PlatformTag key={platform} platform={platform} />
      ))}
    </>
  );
};

export default PlatformTags;
