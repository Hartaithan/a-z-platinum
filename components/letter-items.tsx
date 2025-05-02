import LetterItem from "@/components/letter-item";
import { LetterModalData } from "@/components/letter-modal";
import { FC } from "react";

const EmptyList: FC = () => (
  <div className="flex items-center justify-center">
    <p className="font-medium">Nothing found :(</p>
  </div>
);

type Props = Partial<LetterModalData>;

const LetterItems: FC<Props> = (props) => {
  const { items, letter } = props;
  if (!items || items.length === 0) return <EmptyList />;
  return (
    <div className="w-full-scrollbar scrollbar-gutter flex max-h-[80vh] flex-col gap-y-3 overflow-auto">
      {items.map((item) => (
        <LetterItem key={item} item={item} letter={letter} />
      ))}
    </div>
  );
};

export default LetterItems;
