"use client";

import StatItem from "@/components/stat-item";
import YearFilter from "@/components/year-filter";
import { difficultyLabels } from "@/constants/alphabet";
import { useData } from "@/providers/data";
import { useSettings } from "@/providers/settings";
import { cn } from "@/utils/styles";
import Image from "next/image";
import { FC } from "react";

const EmptyProfile: FC = () => {
  return (
    <section
      id="profile"
      className="container mt-4 flex h-[100px] flex-col items-center justify-center">
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
    </section>
  );
};

const Content: FC = () => {
  const { profile } = useData();
  const { settings } = useSettings();
  return (
    <section
      id="profile"
      className="container mt-4 flex h-auto flex-wrap items-center justify-center gap-4 md:h-12 md:flex-nowrap md:justify-start">
      <div
        className={cn(
          "flex w-full items-center gap-4 sm:w-auto",
          settings.hide && "blur-md",
        )}>
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
      </div>
      <YearFilter className="ml-0 md:ml-auto" />
      <div className="bg-border h-full w-auto md:w-[1px]" />
      <StatItem
        value={difficultyLabels[settings.difficulty]}
        label="Difficulty"
      />
      <div className="bg-border h-full w-auto md:w-[1px]" />
      <div className="flex flex-wrap justify-center gap-5 md:flex-nowrap">
        <StatItem value={profile?.counts?.platinum} label="Platinum" />
        <StatItem value={profile?.counts?.gold} label="Gold" />
        <StatItem value={profile?.counts?.silver} label="Silver" />
        <StatItem value={profile?.counts?.bronze} label="Bronze" />
        <StatItem value={profile?.counts?.total} label="Total" />
      </div>
    </section>
  );
};

const Profile: FC = () => {
  const { profile } = useData();
  if (!profile) return <EmptyProfile />;
  return <Content />;
};

export default Profile;
