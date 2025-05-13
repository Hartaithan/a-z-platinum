import { FC } from "react";

const EmptyProfile: FC = () => {
  return (
    <div className="container mt-4 flex h-[100px] flex-col items-center justify-center">
      <h1 className="mb-1 text-xl font-bold">
        Welcome to A-Z Platinum Challenge!
      </h1>
      <p className="text-center text-sm text-gray-600">
        Choose a game for every letter from A to Z, earn the platinum trophy in
        each one, and complete the challenge. Track your progress as you go!
      </p>
      <p className="text-center text-sm font-semibold text-gray-600">
        Just make sure your PSN profile is set to public so your trophy data can
        be accessed!
      </p>
    </div>
  );
};

export default EmptyProfile;
