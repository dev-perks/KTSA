import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { RefreshCcw, Trash2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function EditUserForm({ userData, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    role: "PROMOTER",
    region: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        dob: userData.dob || "",
        role: userData.role || "PROMOTER",
        region: userData.region || "",
        password: "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare update data (exclude password if not changed)
      const updateData = { ...formData };
      if (!updateData.password) {
        delete updateData.password;
      }

      // Call your API endpoint for updating
      const response = await axios.put(
        `${BASE_URL}/auth/users/${userData.id}`,
        updateData,
        { withCredentials: true }
      );

      toast.success("User updated successfully");

      if (onSuccess) onSuccess(response.data.user);
    } catch (error) {
      toast.error(`${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto  p-6 mt-6 rounded-md border shadow-sm"
    >
      {/* Role */}
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Role
      </label>
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full bg-gray-100 p-2 rounded-md mb-4 outline-none"
        required
      >
        <option value="ADMIN">Admin</option>
        <option value="PROMOTER">Promoter</option>
        <option value="MANAGER">Manager</option>
      </select>

      {/* Name */}
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Full Name
      </label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full bg-gray-100 p-2 rounded-md mb-4 outline-none"
        required
        minLength={3}
        maxLength={100}
      />
      {/* Name */}
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Mail
      </label>
      <input
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full bg-gray-100 p-2 rounded-md mb-4 outline-none"
        required
        minLength={3}
        maxLength={100}
      />

      {/* Password Update */}
      <label className="block mb-2 text-sm font-medium text-gray-700">
        New Password (leave blank to keep current)
      </label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter new password"
        className="w-full bg-gray-100 p-2 rounded-md mb-4 outline-none"
        minLength={6}
        maxLength={20}
      />

      {/* Phone */}
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Phone Number
      </label>
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full bg-gray-100 p-2 rounded-md mb-4 outline-none"
        required
      />

      {/* Date of Birth */}
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Date of Birth
      </label>
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        className="w-full bg-gray-100 p-2 rounded-md mb-4 outline-none"
      />

      {/* Region */}
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Region
      </label>
      <input
        type="text"
        name="region"
        value={formData.region}
        onChange={handleChange}
        className="w-full bg-gray-100 p-2 rounded-md mb-6 outline-none"
      />

      <div className="flex justify-center space-x-4">
        <Button
          type="submit"
          className="flex items-center gap-2 w-[140px] bg-blue-600 hover:bg-blue-700"
          disabled={loading}
        >
          <RefreshCcw size={16} />
          {loading ? "Updating..." : "Update"}
        </Button>
      </div>
    </form>
  );
}
