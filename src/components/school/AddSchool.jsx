import React, { useState } from "react";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";

export default function AddSchool({ initialData, onSuccess }) {
  // guard against null
  const safeInitial = initialData ?? {};
  const isEdit = Boolean(safeInitial.id);

  const [formData, setFormData] = useState({
    name: safeInitial.name || "",
    address: safeInitial.address || "",
    contact: safeInitial.contact || "",
    region: safeInitial.region || "",
  });

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    onSuccess(formData);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-4 sm:p-6 rounded-md border shadow-sm">
      <label className="block mb-2 text-sm font-medium text-gray-700">School Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full bg-gray-100 p-2 rounded-md mb-4 outline-none"
      />

      <label className="block mb-2 text-sm font-medium text-gray-700">Address</label>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        className="w-full bg-gray-100 p-2 rounded-md mb-4 outline-none"
      />

      <label className="block mb-2 text-sm font-medium text-gray-700">Contact Detail</label>
      <input
        type="text"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        className="w-full bg-gray-100 p-2 rounded-md mb-4 outline-none"
      />

      <label className="block mb-2 text-sm font-medium text-gray-700">Region</label>
      <input
        type="text"
        name="region"
        value={formData.region}
        onChange={handleChange}
        className="w-full bg-gray-100 p-2 rounded-md mb-6 outline-none"
      />

      <div className="flex flex-col items-center">
        <Button
          onClick={handleSubmit}
          className="flex items-center justify-center gap-2 w-full sm:w-[140px] bg-blue-600 hover:bg-blue-700"
        >
          <RefreshCcw size={16} />
          {isEdit ? "Update" : "Create"}
        </Button>
      </div>
    </div>
  );
}
