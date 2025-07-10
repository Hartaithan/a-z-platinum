"use client";

import Avatar from "@/components/avatar";
import StatItem from "@/components/stat-item";
import YearFilter from "@/components/year-filter";
import { difficultyLabels } from "@/constants/alphabet";
import { useData } from "@/providers/data";
import { useSettings } from "@/providers/settings";
import { cn } from "@/utils/styles";
import { FC } from "react";

const EmptyProfile: FC = () => {
  return (
    <section
      id="profile"
      className="container mt-4 flex flex-col items-center justify-center text-center">
      <h1 className="text-md mb-1 font-bold md:text-xl">
        Welcome to A-Z Platinum Challenge!
      </h1>
      <p className="text-xs text-gray-600 md:text-sm">
        Choose a game for every letter from A to Z, earn the platinum trophy in
        each one, and complete the challenge. Track your progress as you go!
      </p>
      <p className="text-xs font-semibold text-gray-600 md:text-sm">
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
      className="@capture:h-12 @capture:flex-nowrap @capture:justify-start @capture:gap-4 @capture:mt-0 container mt-4 flex h-auto flex-wrap items-center justify-center gap-3 md:h-12 md:flex-nowrap md:justify-start md:gap-4">
      <div
        className={cn(
          "flex w-full items-center gap-4 sm:w-auto",
          settings.hide && "blur-md",
        )}>
        <Avatar src={profile?.avatar_url} name={profile?.name} />
        <div className="flex flex-col leading-[normal]">
          <h1 className="font-bold">{profile?.name ?? "Trophy Hunter"}</h1>
          <p className="text-sm text-gray-600">
            Level: {profile?.level ?? "420"}
          </p>
        </div>
      </div>
      <YearFilter className="@capture:ml-auto ml-0 md:ml-auto" />
      <div className="bg-border @capture:w-[1px] h-full w-auto md:w-[1px]" />
      <StatItem
        value={difficultyLabels[settings.difficulty]}
        label="Difficulty"
      />
      <div className="bg-border @capture:w-[1px] h-full w-auto md:w-[1px]" />
      <div className="@capture:flex-nowrap @capture:gap-5 flex flex-wrap justify-center gap-4 md:flex-nowrap md:gap-5">
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
