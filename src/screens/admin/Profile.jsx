import WithBottomNavbar from "@/components/layout/WithBottomNavbar";
import ProfileListPage from "@/components/profile/ProfileListPage";
import React from "react";

export default function Profile() {
  return (
    <WithBottomNavbar>
      <ProfileListPage />
    </WithBottomNavbar>
  );
}
