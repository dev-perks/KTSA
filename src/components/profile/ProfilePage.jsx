import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import sampleProfile from "../../utils/sampleProfile";

const fields = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "dob", label: "Date of Birth" },
  { key: "contact", label: "Contact Number" },
  { key: "region", label: "Region" },
];

export default function ProfilePage() {
  const profile = sampleProfile;
  const avatarSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    profile.name || "User"
  )}&background=random`;
  const fieldClass = "w-full border border-gray-200 rounded px-3 py-2 bg-gray-50";

  const handleLogout = () => {
    window.location.href = "/login";
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-50">
      <div className="bg-white overflow-auto px-6 pt-6 pb-24">
        <h1 className="text-2xl font-semibold mb-6 text-center">My Profile</h1>

        <div className="flex justify-center mb-6">
          <img
            src={avatarSrc}
            alt="Profile avatar"
            className="w-24 h-24 rounded-full"
          />
        </div>

        <div className="space-y-4">
          {fields.map(({ key, label }) => (
            <div key={key}>
              <Label className="block mb-1">{label}</Label>
              <div className={fieldClass}>{profile[key]}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
