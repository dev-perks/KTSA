import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Trash2, RefreshCcw } from "lucide-react";

export default function AddUser({ initialData = {}, onSuccess, onDelete }) {
  const [formData, setFormData] = useState({
    role: initialData.role || "",
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    dob: initialData.dob || "",
    contactNumber: initialData.contactNumber || "",
    region: initialData.region || "",
  });

  useEffect(() => {
    setFormData({
      role: initialData.role || "",
      firstName: initialData.firstName || "",
      lastName: initialData.lastName || "",
      dob: initialData.dob || "",
      contactNumber: initialData.contactNumber || "",
      region: initialData.region || "",
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess(formData);
  };

  const handleDelete = () => {
    if (onDelete) onDelete();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 mt-6 rounded-md border shadow-sm"
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
      >
        <option value="" disabled>
          Select a role
        </option>
        <option value="Admin">Admin</option>
        <option value="Promoter">Promoter</option>
      </select>

      {/* First Name */}
      <label className="block mb-2 text-sm font-medium text-gray-700">
        First Name
      </label>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="Enter first name"
        className="w-full bg-gray-100 p-2 rounded-md mb-4 outline-none"
      />

      {/* Last Name */}
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Last Name
      </label>
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Enter last name"
        className="w-full bg-gray-100 p-2 rounded-md mb-4 outline-none"
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

      {/* Contact Number */}
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Contact Number
      </label>
      <input
        type="tel"
        name="contactNumber"
        value={formData.contactNumber}
        onChange={handleChange}
        placeholder="Enter contact number"
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

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        {initialData.firstName && (
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="flex items-center gap-2 w-[140px]"
          >
            <Trash2 size={16} /> Delete
          </Button>
        )}
        <Button
          type="submit"
          className="flex items-center gap-2 w-[140px] bg-blue-600 hover:bg-blue-700"
        >
          <RefreshCcw size={16} /> Save
        </Button>
      </div>
    </form>
  );
}
