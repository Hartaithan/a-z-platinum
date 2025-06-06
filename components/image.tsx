"use client";

import { Spinner } from "@/ui/spinner";
import { ImageProps, default as NextImage } from "next/image";
import { FC, useEffect, useRef, useState } from "react";

const Image: FC<ImageProps> = (props) => {
  const { className, src, alt, ...rest } = props;
  const [isLoading, setLoading] = useState(true);
  const currentSrc = useRef(src);

  useEffect(() => {
    if (src === currentSrc.current) return;
    setLoading(true);
    currentSrc.current = src;
  }, [src]);

  return (
    <div className="relative inline-block w-fit">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex grow items-center justify-center rounded-md bg-black/50">
          <Spinner className="size-14" />
        </div>
      )}
      <NextImage
        className={className}
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoading(false)}
        {...rest}
      />
    </div>
  );
};

export default Image;
