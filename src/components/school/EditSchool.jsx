import React, { useState } from "react";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function EditSchool({ initialData, onSuccess }) {
  const [formData, setFormData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (
      !formData.name ||
      !formData.address ||
      !formData.contactDetail ||
      !formData.region
    ) {
      toast.error("Please fill all fields");
      return;
    }

    setIsLoading(true);
    try {
      await axios.put(`${BASE_URL}/admin/schools/${initialData.id}`, formData, {
        withCredentials: true,
      });
      toast.success("School updated successfully");
      onSuccess();
    } catch (err) {
      console.error("Error updating school:", err);
      toast.error(err.response?.data?.message || "Failed to update school");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-4 sm:p-6 rounded-md border shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Edit School</h2>

      <label className="block mb-2 text-sm font-medium text-gray-700">
        School Name
      </label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full bg-gray-100 p-2 rounded-md mb-4 outline-none"
        disabled={isLoading}
      />

      <label className="block mb-2 text-sm font-medium text-gray-700">
        Address
      </label>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        className="w-full bg-gray-100 p-2 rounded-md mb-4 outline-none"
        disabled={isLoading}
      />

      <label className="block mb-2 text-sm font-medium text-gray-700">
        Contact Detail
      </label>
      <input
        type="text"
        name="contactDetail"
        value={formData.contactDetail}
        onChange={handleChange}
        className="w-full bg-gray-100 p-2 rounded-md mb-4 outline-none"
        disabled={isLoading}
      />

      <label className="block mb-2 text-sm font-medium text-gray-700">
        Region
      </label>
      <input
        type="text"
        name="region"
        value={formData.region}
        onChange={handleChange}
        className="w-full bg-gray-100 p-2 rounded-md mb-6 outline-none"
        disabled={isLoading}
      />

      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
        <Button
          variant="default"
          onClick={handleUpdate}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 w-full sm:w-[140px] bg-blue-600 hover:bg-blue-700"
        >
          <Save size={16} />
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
