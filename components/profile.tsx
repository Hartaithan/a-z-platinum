"use client";

import { difficultyLabels } from "@/constants/alphabet";
import { useData } from "@/providers/data";
import { useSettings } from "@/providers/settings";
import { cn } from "@/utils/styles";
import Image from "next/image";
import { ComponentPropsWithoutRef, FC } from "react";

const EmptyProfile: FC = () => {
  return (
    <div className="container mt-4 flex h-12 items-center justify-center">
      <pre>empty</pre>
    </div>
  );
};

interface CountProps extends ComponentPropsWithoutRef<"div"> {
  value: string | number | undefined;
  label: string;
}

const Count: FC<CountProps> = (props) => {
  const { className, value, label, ...rest } = props;
  return (
    <div
      className={cn("flex flex-col items-center leading-[normal]", className)}
      {...rest}>
      <p className="font-bold">{value ?? "-"}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
};

const Profile: FC = () => {
  const { profile } = useData();
  const { settings } = useSettings();
  if (!profile || Object.keys(profile).length === 0) return <EmptyProfile />;
  return (
    <div className="container mt-4 flex h-12 items-center gap-4">
      <Image
        className="rounded-full"
        width={48}
        height={48}
        src={profile?.avatar_url}
        alt={profile?.name}
        unoptimized
      />
      <div className="flex flex-col leading-[normal]">
        <h1 className="font-bold">{profile?.name}</h1>
        <p className="text-sm text-gray-600">Level: {profile?.level}</p>
      </div>
      <Count
        className="ml-auto"
        value={difficultyLabels[settings.difficulty]}
        label="Difficulty"
      />
      <div className="bg-border h-full w-[1px]" />
      <div className="flex gap-5">
        <Count value={profile?.counts?.platinum} label="Platinum" />
        <Count value={profile?.counts?.gold} label="Gold" />
        <Count value={profile?.counts?.silver} label="Silver" />
        <Count value={profile?.counts?.bronze} label="Bronze" />
        <Count value={profile?.counts?.total} label="Total" />
      </div>
    </div>
  );
};

export default Profile;
