import { imageStatues } from "@/constants/image";
import { Spinner } from "@/ui/spinner";
import { cn } from "@/utils/styles";
import { FC, Ref, useImperativeHandle, useState } from "react";

export interface LoaderHandle {
  start: () => void;
  stop: () => void;
}

interface Props {
  ref: Ref<LoaderHandle>;
}

const GameLoader: FC<Props> = (props) => {
  const { ref } = props;
  const [isLoading, setLoading] = useState(true);
  const status = isLoading && imageStatues.loading;

  useImperativeHandle(ref, () => ({
    start: () => setLoading(true),
    stop: () => setLoading(false),
  }));

  if (!isLoading) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 z-[4] flex grow items-center justify-center bg-black/50 transition-opacity duration-300",
        status,
      )}>
      <Spinner className="size-7/12" />
    </div>
  );
};

export default GameLoader;
