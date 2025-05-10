import { difficultyLabels, difficultyRaw } from "@/constants/alphabet";
import { DifficultyKey } from "@/models/alphabet";
import { FC } from "react";

const values = Object.entries(difficultyRaw);

const DifficultyHint: FC = () => (
  <div className="mt-2 text-xs font-normal text-neutral-500">
    <p>
      select the difficulty level you want to use. the difficulty&nbsp;
      <b>determines the set of characters</b>
    </p>
    <ul className="mt-1 flex flex-col">
      {values.map(([key, value]) => (
        <li key={key} className="text-xs">
          <b>{difficultyLabels[key as DifficultyKey]}</b>
          :&nbsp;
          {value}
        </li>
      ))}
    </ul>
  </div>
);

export default DifficultyHint;
