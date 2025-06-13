import React, { useState } from "react";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function AddUserForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    role: "PROMOTER",
    region: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call your API endpoint for registration
      const response = await axios.post(`${BASE_URL}/auth/register`, formData, {
        withCredentials: true,
      });

      toast.success("User created successfully");

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
      className="max-w-md mx-auto bg-white p-6 rounded-md border shadow-sm"
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
        placeholder="Enter full name"
        className="w-full bg-gray-100 p-2 rounded-md mb-4 outline-none"
        required
        minLength={3}
        maxLength={100}
      />

      {/* Email */}
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Email
      </label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter email"
        className="w-full bg-gray-100 p-2 rounded-md mb-4 outline-none"
        required
      />

      {/* Password */}
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Password
      </label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter password"
        className="w-full bg-gray-100 p-2 rounded-md mb-4 outline-none"
        required
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
        placeholder="Enter phone number"
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
        placeholder="Enter region"
        className="w-full bg-gray-100 p-2 rounded-md mb-6 outline-none"
      />

      <div className="flex justify-center">
        <Button
          type="submit"
          className="flex items-center gap-2 w-[140px] bg-blue-600 hover:bg-blue-700"
          disabled={loading}
        >
          <RefreshCcw size={16} />
          {loading ? "Creating..." : "Create User"}
        </Button>
      </div>
    </form>
  );
}
