import "./App.css";
import {Routes, Route } from "react-router-dom";

// Screens
import Activity from "./screens/admin/Activity";
import Login from "./screens/auth/Login";
import School from "./screens/admin/School";
import User from "./screens/admin/User";
import Profile from "./screens/admin/Profile";
import PromoterActivity from "./screens/promoter/PromoterActivity";

export default function App() {
  return (
    <Routes>
      {/* This is for admin */}
      <Route path="/" element={<Login />} />
      <Route path="/admin/activity" element={<Activity />} />
      <Route path="/admin/school" element={<School />} />
      <Route path="/admin/user" element={<User />} />
      <Route path="/profile" element={<Profile />} />
      {/* This is for promoter */}
      <Route path="/activity" element={<PromoterActivity />} />
    </Routes>
  );
}
