"use client";

import GameLoader, { LoaderHandle } from "@/components/game-loader";
import { getImageURL } from "@/utils/image";
import { Trophy } from "lucide-react";
import type { ImageProps } from "next/image";
import Image from "next/image";
import {
  ReactEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
} from "react";
import { twMerge } from "tailwind-merge";

const Placeholder: FC = () => (
  <div className="flex size-full items-center justify-center bg-neutral-400">
    <Trophy className="size-8/12 stroke-white" />
  </div>
);

type Props = ImageProps;

type ImageHandler = ReactEventHandler<HTMLImageElement>;

const GameImage: FC<Props> = (props) => {
  const { className, src, alt, ...rest } = props;
  const currentSrc = useRef(src);
  const loader = useRef<LoaderHandle>(null);
  const [hasError, setError] = useState(false);

  const image = getImageURL(src, { height: 96 });

  const handleLoad: ImageHandler = useCallback(() => {
    loader.current?.stop();
  }, []);

  const handleError: ImageHandler = useCallback(() => {
    loader.current?.stop();
    setError(true);
  }, []);

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
      <GameLoader ref={loader} />
      {hasError ? (
        <Placeholder />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default GameImage;
