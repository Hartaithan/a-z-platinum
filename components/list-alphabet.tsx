import { useData } from "@/providers/data";
import { FC } from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#0".split("");

interface LetterProps {
  letter: string;
}

const Letter: FC<LetterProps> = (props) => {
  const { letter } = props;
  const { getItemKeys, getItem } = useData();
  const { items, hasItems, count } = getItemKeys({ letter });
  const firstKey = hasItems ? items[0] : null;
  const item = getItem(firstKey);
  return (
    <div className="flex">
      <p className="w-5 text-center capitalize">{letter}</p>
      <p className="mr-1">-</p>
      {hasItems ? (
        <>
          <p>{item?.title}</p>
          <p>&nbsp;- {count} plats</p>
        </>
      ) : (
        <p>not found</p>
      )}
    </div>
  );
};

const ListAlphabet: FC = () => {
  return (
    <div className="flex flex-col gap-1">
      {letters.map((letter) => (
        <Letter key={letter} letter={letter} />
      ))}
    </div>
  );
};

export default ListAlphabet;
