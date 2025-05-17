import { Spinner } from "@/ui/spinner";
import { cn } from "@/utils/styles";
import { ComponentPropsWithoutRef, FC } from "react";

interface Props extends ComponentPropsWithoutRef<"div"> {
  title: string;
}

const ProgressSpinner: FC<Props> = (props) => {
  const { className, title, children, ...rest } = props;
  return (
    <div
      className={cn("flex flex-col items-center text-white", className)}
      {...rest}>
      <div className="relative size-36">
        <Spinner
          className="size-full fill-white/75"
          pathClassName="fill-white/25"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {children}
        </div>
      </div>
      <p className="mt-2 text-xl font-bold">{title}</p>
    </div>
  );
};

export default ProgressSpinner;
