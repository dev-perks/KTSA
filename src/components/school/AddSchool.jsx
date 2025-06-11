import React, { useState } from "react";
import { Button } from "../ui/button";
import { Trash2, RefreshCcw } from "lucide-react";

export default function AddSchool({ initialData, onSuccess }) {
  const [formData, setFormData] = useState(initialData || {
    schoolName: "",
    address: "",
    contactDetail: "",
    region: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    console.log("Updated data:", formData);
    // send to backend here
    onSuccess();
  };

  const handleDelete = () => {
    console.log("Deleted school:", formData.schoolName);
    // perform delete action here
    onSuccess();
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-4 sm:p-6 rounded-md border shadow-sm">
      <label className="block mb-2 text-sm font-medium text-gray-700">School Name</label>
      <input
        type="text"
        name="schoolName"
        value={formData.schoolName}
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
        name="contactDetail"
        value={formData.contactDetail}
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

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
        <Button
          variant="destructive"
          onClick={handleDelete}
          className="flex items-center justify-center gap-2 w-full sm:w-[140px]"
        >
          <Trash2 size={16} /> Delete
        </Button>

        <Button
          variant="default"
          onClick={handleUpdate}
          className="flex items-center justify-center gap-2 w-full sm:w-[140px] bg-blue-600 hover:bg-blue-700"
        >
          <RefreshCcw size={16} /> {initialData ? 'Update' : 'Create'}
        </Button>
      </div>
    </div>
  );
}