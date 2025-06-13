import React, {  useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const fields = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "dob", label: "Date of Birth", format: (value) => value ? format(new Date(value), "MMMM dd, yyyy") : "N/A" },
  { key: "phone", label: "Contact Number" },
  { key: "region", label: "Region" },
];

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${BASE_URL}/auth/users/profile`,
          {
            withCredentials: true,
            signal: controller.signal,
          }
        );
        setProfile(res.data.user);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Profile fetch cancelled");
        } else {
          console.error("Error fetching profile:", err);
          setError(err.response?.data?.message || "Failed to load profile");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    return () => controller.abort();
  }, []);

  const handleLogout = async () => {
    try {
      //await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const avatarSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    profile?.name || "User"
  )}&background=random`;

  const fieldClass = "w-full border border-gray-200 rounded px-3 py-2 bg-gray-50";

  if (loading) return <div className="flex justify-center items-center h-64"><Spinner /></div>;

  if (error) return (
    <div className="max-w-md mx-auto p-6">
      <p className="text-red-500 font-medium text-center">{error}</p>
      <div className="flex justify-center mt-4">
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto bg-gray-50">
      <div className="bg-white overflow-auto px-6 pt-6 pb-24">
        <h1 className="text-2xl font-semibold mb-6 text-center">My Profile</h1>

        <div className="flex justify-center mb-6">
          <img
            src={avatarSrc}
            alt="Profile"
            className="w-24 h-24 rounded-full "
          />
        </div>

        <div className="space-y-4">
          {fields.map(({ key, label, format }) => (
            <div key={key}>
              <Label className="block mb-1 text-gray-700">{label}</Label>
              <div className={`${fieldClass} text-gray-800`}>
                {format ? format(profile?.[key]) : profile?.[key] || "N/A"}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 ">
          {/* <Button 
            variant="outline" 
            onClick={() => navigate("/edit-profile")}
            className="border-primary text-primary hover:bg-primary/10"
          >
            Edit Profile
          </Button> */}
          <Button 
            variant="destructive" 
            onClick={handleLogout}
            className="hover:bg-destructive/90"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}