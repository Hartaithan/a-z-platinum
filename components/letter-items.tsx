import LetterItem from "@/components/letter-item";
import { useLetter } from "@/providers/letter";
import { FC, memo } from "react";
import { VList } from "virtua";

const EmptyList: FC = () => (
  <div className="flex items-center justify-center">
    <p className="font-medium">Nothing found :(</p>
  </div>
);

const LetterItems: FC = () => {
  const { items } = useLetter();
  if (!items || items.length === 0) return <EmptyList />;
  return (
    <VList
      className="!w-full-scrollbar scrollbar-gutter flex-col gap-y-3 overflow-auto"
      style={{ height: "80vh" }}>
      {items.map((item, index) => (
        <LetterItem key={item} item={item} last={items.length === index + 1} />
      ))}
    </VList>
  );
};

export default memo(LetterItems);
