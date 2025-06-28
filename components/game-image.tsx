"use client";

import { imageStatues } from "@/constants/image";
import { Spinner } from "@/ui/spinner";
import { getImageURL } from "@/utils/image";
import { cn } from "@/utils/styles";
import type { ImageProps } from "next/image";
import Image from "next/image";
import {
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type FC,
} from "react";
import { twMerge } from "tailwind-merge";

type Props = ImageProps;

interface LoaderHandle {
  start: () => void;
  stop: () => void;
}

interface LoaderProps {
  ref: Ref<LoaderHandle>;
}

const Loader: FC<LoaderProps> = (props) => {
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

const GameImage: FC<Props> = (props) => {
  const { className, src, alt, ...rest } = props;
  const currentSrc = useRef(src);
  const loader = useRef<LoaderHandle>(null);

  const image = getImageURL(src as string, { height: 96 });

  const handleLoad = useCallback(() => loader.current?.stop(), []);
  const handleError = useCallback(() => loader.current?.stop(), []);

  useEffect(() => {
    if (src === currentSrc.current) return;
    currentSrc.current = src;
    loader.current?.start();
  }, [src]);

  return (
    <div
      className={twMerge(
        "relative flex aspect-[20/11] h-14 w-auto flex-shrink-0 justify-center overflow-hidden rounded-md",
        className,
      )}>
      <Loader ref={loader} />
      <Image
        className="relative z-[3] h-full w-auto object-contain drop-shadow-md"
        src={image}
        alt={alt}
        {...rest}
        width="0"
        height="0"
        unoptimized
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
      />
      <div className="absolute z-[2] size-full bg-black/10" />
      <Image
        className="z-[1] object-cover blur-xs"
        src={image}
        alt={`${alt} background`}
        {...rest}
        fill
        unoptimized
        loading="lazy"
      />
    </div>
  );
};

export default GameImage;
