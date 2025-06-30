import { getImageURL } from "@/utils/image";
import { UserRound } from "lucide-react";
import Image from "next/image";
import { FC, ReactEventHandler, useCallback, useState } from "react";

interface Props {
  src: string | undefined;
  name: string | undefined;
}

type ImageHandler = ReactEventHandler<HTMLImageElement>;

const Placeholder: FC = () => (
  <div className="flex size-12 items-center justify-center rounded-full bg-neutral-400/80">
    <UserRound className="size-8/12 stroke-white" />
  </div>
);

const Avatar: FC<Props> = (props) => {
  const { src, name } = props;
  const [hasError, setError] = useState(false);

  const handleError: ImageHandler = useCallback(() => setError(true), []);

  if (!src || hasError) return <Placeholder />;

  return (
    <Image
      className="rounded-full"
      width={48}
      height={48}
      src={getImageURL(src)}
      alt={name ?? "Avatar"}
      unoptimized
      onError={handleError}
    />
  );
};

export default Avatar;
