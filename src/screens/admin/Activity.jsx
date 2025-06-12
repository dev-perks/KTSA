import React from "react";
import ActivityListPage from "../../components/activity/ActivityListPage";
import WithBottomNavbar from "../../components/layout/WithBottomNavbar";

export default function Activity() {
  return (
    <WithBottomNavbar>
        <ActivityListPage />
    </WithBottomNavbar>
  );
}