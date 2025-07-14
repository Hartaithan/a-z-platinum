import LetterItem from "@/components/letter-item";
import { useLetter } from "@/providers/letter";
import { FC, memo } from "react";

const EmptyList: FC = () => (
  <div className="flex items-center justify-center">
    <p className="font-medium">Nothing found :(</p>
  </div>
);

const LetterItems: FC = () => {
  const { items } = useLetter();
  if (!items || items.length === 0) return <EmptyList />;
  return (
    <div className="w-full-scrollbar scrollbar-gutter flex max-h-[80vh] flex-col gap-y-3 overflow-auto">
      {items.map((item) => (
        <LetterItem key={item} item={item} />
      ))}
    </div>
  );
};

export default memo(LetterItems);
