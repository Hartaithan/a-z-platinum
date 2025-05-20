import { useFeatured } from "@/providers/featured";
import { Button } from "@/ui/button";
import { Label } from "@radix-ui/react-label";
import { FC } from "react";

const FeaturedReset: FC = () => {
  const { resetFeatured } = useFeatured();
  return (
    <div className="flex flex-col">
      <Label className="text-sm font-semibold">Featured</Label>
      <p className="mt-0.5 text-xs font-normal text-neutral-500">
        remove all games currently marked as <b>main one</b> - highlighted
        titles that appear on the homepage
      </p>
      <Button
        variant="outline"
        className="mt-2 font-semibold"
        size="sm"
        onClick={resetFeatured}>
        Reset
      </Button>
    </div>
  );
};

export default FeaturedReset;
