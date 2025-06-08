import "./App.css";
import {Routes, Route } from "react-router-dom";

// Screens
import Activity from "./screens/admin/Activity";
import Login from "./screens/auth/Login";
import School from "./screens/admin/School";
import User from "./screens/admin/User";
import Profile from "./screens/admin/Profile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/activity" element={<Activity />} />
      <Route path="/school" element={<School />} />
      <Route path="/user" element={<User />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}
