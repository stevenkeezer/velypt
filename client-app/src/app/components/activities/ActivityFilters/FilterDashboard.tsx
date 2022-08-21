import React, { SyntheticEvent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../stores/store";
import { useRouter } from "next/router";
import WelcomePanel from "../../Profile/WelcomePanel";
import ProfileNav from "../../Profile/ProfileNav";

export default observer(function FilterDashboard() {
  const router = useRouter();
  const {
    profileStore,
    userStore: { user },
  } = useStore();
  const {
    loadingProfile,
    loadProfile,
    profile,
    setActiveTab,
    loadUserActivities,
  } = profileStore;

  const { profile: username } = router.query;

  useEffect(() => {
    if (username) {
      loadProfile(username as string);
    }
    return () => {
      setActiveTab(0);
    };
  }, [loadProfile, username, setActiveTab]);

  useEffect(() => {
    loadUserActivities(profile?.username, "hosting"); // also past default is upcoming events
  }, [loadUserActivities, profile?.username, router]);

  useEffect(() => {
    loadProfile(user?.username);
  }, [loadProfile, user?.username]);

  console.log(profile, "Pr");

  return (
    <article className="w-full h-full bg-[#f9f8f8] dark:bg-transparent">
      <WelcomePanel profile={profile} />
      <div className="dark:bg-transparent">
        <ProfileNav />

        <div className="max-w-5xl -pt-6 mx-auto px-4 sm:px-6">
          {/* <ActivityFilters /> */}
          <div className="hidden  relative sm:block 2xl:hidden min-w-0 flex-1 ">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
              {loadingProfile && "Loading profile"}
            </h1>
          </div>
        </div>
      </div>
    </article>
  );
});
