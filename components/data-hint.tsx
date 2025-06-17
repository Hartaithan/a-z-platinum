import { dataDescriptions, dataKeys, dataLabels } from "@/constants/app";
import { FC } from "react";

const DataHint: FC = () => (
  <div className="mt-2 text-xs font-normal text-neutral-500">
    <p>select what data type you want to use</p>
    <ul className="mt-1 flex flex-col">
      {dataKeys.map((key) => (
        <li key={key} className="text-xs">
          <b>{dataLabels[key]}</b>
          :&nbsp;
          {dataDescriptions[key]}
        </li>
      ))}
    </ul>
  </div>
);

export default DataHint;
