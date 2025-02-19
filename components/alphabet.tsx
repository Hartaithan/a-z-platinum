import { FC } from "react";

const letters = "abcdefghijklmnopqrstuvwxyz#0".split("");

const Alphabet: FC = () => {
  return (
    <div className="mt-4 grid grid-cols-7 gap-2">
      {letters.map((letter) => (
        <div
          key={letter}
          className="flex aspect-square size-24 items-center justify-center rounded bg-neutral-800"
        >
          <p className="text-[2.5rem] font-bold uppercase">{letter}</p>
        </div>
      ))}
    </div>
  );
};

export default Alphabet;
