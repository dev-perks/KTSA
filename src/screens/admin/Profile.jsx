import WithBottomNavbar from "@/components/layout/WithBottomNavbar";
import ProfilePage from "@/components/profile/ProfilePage";
import React from "react";

export default function Profile() {
  return (
    <WithBottomNavbar>
      <ProfilePage />
    </WithBottomNavbar>
  );
}
