import WithBottomNavbar from "@/components/layout/WithBottomNavbar";
import UserListPage from "@/components/user/UserListPage";
import React from "react";

export default function User() {
  return (
    <WithBottomNavbar>
      <UserListPage />
    </WithBottomNavbar>
  );
}
