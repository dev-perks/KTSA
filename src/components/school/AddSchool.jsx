import React, { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function AddSchool({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contactDetail: "",
    region: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
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
      await axios.post(`${BASE_URL}/admin/schools`, formData, {
        withCredentials: true,
      });
      toast.success("School created successfully");
      onSuccess();
      setFormData({ name: "", address: "", contactDetail: "", region: "" }); // Reset form
    } catch (err) {
      console.error("Error creating school:", err);
      toast.error(err.response?.data?.message || "Failed to create school");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-4 sm:p-6 rounded-md border shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Add New School</h2>

      <label className="block mb-2 text-sm font-medium text-gray-700">
        School Name
      </label>
      <input
        type="text"
        name="name"
        value={formData.name}
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
        name="contact"
        value={formData.contact}
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

      <Button
        variant="default"
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        <Plus size={16} className="mr-2" />
        {isLoading ? "Creating..." : "Create School"}
      </Button>
    </div>
  );
}

