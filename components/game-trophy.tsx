import { useData } from "@/providers/data";
import { getImageURL } from "@/utils/image";
import Image from "next/image";
import { FC, memo } from "react";

interface Props {
  item: string;
}

const GameTrophy: FC<Props> = (props) => {
  const { item } = props;
  const { getItem } = useData();
  const trophy = getItem(item)?.trophy;
  if (!trophy) return null;
  return (
    <div className="mt-3 border-t pt-3">
      <div className="flex items-center">
        <Image
          className="image-shadow h-auto min-w-12 rounded-md"
          width={48}
          height={48}
          alt={trophy?.title ?? "Unknown"}
          src={getImageURL(trophy?.image_url, { height: 48 })}
          unoptimized
        />
        <div className="ml-3">
          <h4 className="text-xs font-medium sm:text-sm">
            {trophy?.title || "Platinum Trophy"}
          </h4>
          <p className="mt-0.5 text-xs text-gray-600 md:text-sm">
            {trophy?.description}
          </p>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600">
        <span>
          <span className="font-medium">Type:&nbsp;</span>
          <span className="capitalize">{trophy?.type}</span>
        </span>
        <span>
          <span className="font-medium">Earned:&nbsp;</span>
          {new Date(trophy?.earned_at ?? "").toLocaleString()}
        </span>
        <span>
          <span className="font-medium capitalize">
            {trophy?.rarity_label ?? "Rarity"}:&nbsp;
          </span>
          {trophy?.earned_rate?.toLocaleString() ?? "Unknown"}%
        </span>
      </div>
    </div>
  );
};

export default memo(GameTrophy);
