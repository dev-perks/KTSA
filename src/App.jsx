import "./App.css";
import {Routes, Route } from "react-router-dom";

// Screens
import Activity from "./screens/admin/Activity";
import Login from "./screens/auth/Login";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/activity" element={<Activity />} />
    </Routes>
  );
}
