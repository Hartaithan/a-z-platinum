import { Spinner } from "@/ui/spinner";
import { cn } from "@/utils/styles";
import { ComponentPropsWithoutRef, FC } from "react";

type Props = ComponentPropsWithoutRef<"div">;

const ProgressSpinner: FC<Props> = (props) => {
  const { className, children, ...rest } = props;
  return (
    <div className={cn("relative size-24 p-1", className)} {...rest}>
      <Spinner
        className="size-full fill-white/75"
        pathClassName="fill-white/25"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </div>
  );
};

export default ProgressSpinner;
