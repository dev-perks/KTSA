import WithBottomNavbar from "@/components/layout/WithBottomNavbar";
import SchoolListPage from "@/components/school/SchoolListPage";
import React from "react";

export default function School() {
  return (
    <WithBottomNavbar>
      <SchoolListPage />
    </WithBottomNavbar>
  );
}
