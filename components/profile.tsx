"use client";

import EmptyProfile from "@/components/empty-profile";
import StatItem from "@/components/stat-item";
import YearFilter from "@/components/year-filter";
import { difficultyLabels } from "@/constants/alphabet";
import { useData } from "@/providers/data";
import { useSettings } from "@/providers/settings";
import Image from "next/image";
import { FC } from "react";

const Content: FC = () => {
  const { profile } = useData();
  const { settings } = useSettings();
  return (
    <div className="container mt-4 flex h-12 items-center gap-4">
      {profile?.avatar_url ? (
        <Image
          className="rounded-full"
          width={48}
          height={48}
          src={profile?.avatar_url}
          alt={profile?.name}
          unoptimized
        />
      ) : (
        <div className="bg-border size-12 rounded-full" />
      )}
      <div className="flex flex-col leading-[normal]">
        <h1 className="font-bold">{profile?.name ?? "Trophy Hunter"}</h1>
        <p className="text-sm text-gray-600">
          Level: {profile?.level ?? "420"}
        </p>
      </div>
      <YearFilter className="ml-auto" />
      <div className="bg-border h-full w-[1px]" />
      <StatItem
        value={difficultyLabels[settings.difficulty]}
        label="Difficulty"
      />
      <div className="bg-border h-full w-[1px]" />
      <div className="flex gap-5">
        <StatItem value={profile?.counts?.platinum} label="Platinum" />
        <StatItem value={profile?.counts?.gold} label="Gold" />
        <StatItem value={profile?.counts?.silver} label="Silver" />
        <StatItem value={profile?.counts?.bronze} label="Bronze" />
        <StatItem value={profile?.counts?.total} label="Total" />
      </div>
    </div>
  );
};

const Profile: FC = () => {
  const { profile } = useData();
  if (!profile) return <EmptyProfile />;
  return <Content />;
};

export default Profile;
