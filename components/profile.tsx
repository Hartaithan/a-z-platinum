"use client";

import { useData } from "@/providers/data";
import Image from "next/image";
import { FC } from "react";

const EmptyProfile: FC = () => {
  return (
    <div className="container mt-4 flex h-12 items-center justify-center">
      <pre>empty</pre>
    </div>
  );
};

interface CountProps {
  value: string | number | undefined;
  label: string;
}

const Count: FC<CountProps> = (props) => {
  const { value, label } = props;
  return (
    <div className="flex flex-col items-center leading-[normal]">
      <p className="font-bold">{value ?? "-"}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
};

const Profile: FC = () => {
  const { profile } = useData();
  if (!profile || Object.keys(profile).length === 0) return <EmptyProfile />;
  return (
    <div className="container mt-4 flex items-center">
      <Image
        className="rounded-full"
        width={48}
        height={48}
        src={profile?.avatar_url}
        alt={profile?.name}
        unoptimized
      />
      <div className="ml-4 flex flex-col leading-[normal]">
        <h1 className="font-bold">{profile?.name}</h1>
        <p className="text-sm text-gray-600">Level: {profile?.level}</p>
      </div>
      <div className="ml-auto flex gap-5">
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
