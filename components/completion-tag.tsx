import { CompletionType } from "@/models/platinum";
import { cn } from "@/utils/styles";
import { Check, LucideProps, Trophy } from "lucide-react";
import { FC } from "react";

interface Props {
  completion: CompletionType | null | undefined;
}

const colors: Record<CompletionType, string> = {
  platinum: "bg-blue-100 text-blue-800",
  complete: "bg-green-100 text-green-800",
};

const icons: Record<CompletionType, FC<LucideProps>> = {
  platinum: Trophy,
  complete: Check,
};

const CompletionTag: FC<Props> = (props) => {
  const { completion } = props;
  if (!completion) return null;
  const Icon = icons[completion];
  return (
    <span
      className={cn(
        "flex items-center rounded-full px-2 py-0.5 text-xs",
        colors[completion],
      )}>
      <Icon className="size-3" />
      <p className="ml-1 capitalize">{completion}</p>
    </span>
  );
};

export default CompletionTag;
