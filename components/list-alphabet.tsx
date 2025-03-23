import { FC } from "react";

const letters = "abcdefghijklmnopqrstuvwxyz#0".split("");

const ListAlphabet: FC = () => {
  return (
    <div className="flex flex-col gap-1">
      {letters.map((letter) => (
        <div key={letter} className="flex">
          <p className="w-5 text-center capitalize">{letter}</p>
          <p className="mr-1">-</p>
          <p>not found</p>
        </div>
      ))}
    </div>
  );
};

export default ListAlphabet;
