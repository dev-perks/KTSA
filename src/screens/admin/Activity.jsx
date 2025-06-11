import React, { useContext } from "react";
import ActivityListPage from "../../components/activity/ActivityListPage";
import WithBottomNavbar from "../../components/layout/WithBottomNavbar";
import { UserContext } from "@/context/userContext";

export default function Activity() {
  const {userData} = useContext(UserContext);
  console.log("User Data : ",userData)
  return (
    <WithBottomNavbar>
      {userData.role === "ADMIN" && (
        <ActivityListPage />
      )}
    </WithBottomNavbar>
  );
}