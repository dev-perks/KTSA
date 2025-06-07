import React, { useState } from "react";
import { CalendarIcon, MapPin, School } from "lucide-react";

const schoolsData = {
  Open: [
    {
      name: "NEW GARDENS PRIMARY",
      location: "Eastern Cape - Stutterheim",
      date: "2025-05-29T11:30",
      sampling: 1,
      lunchBox: 0,
    },
    {
      name: "NDAKANA PRIMARY SCHOOL",
      location: "Eastern Cape - Stutterheim",
      date: "2025-05-29T11:30",
      sampling: 1,
      lunchBox: 0,
    },
  ],
  "In Progress": [
    {
      name: "Palmiet primary",
      location: "KwaZulu-Natal - Reservoir hills",
      date: "2025-05-26T11:30",
      sampling: 2,
      lunchBox: 0,
    },
  ],
  Completed: [
    {
      name: "Phalane Primary",
      location: "KwaZulu-Natal - Richard's bay",
      date: "2025-06-06T11:30",
      sampling: 1,
      lunchBox: 0,
    },
  ],
};

export default function ActivityTabs() {
  const [region, setRegion] = useState("KwaZulu-Natal");
  const [activeTab, setActiveTab] = useState("Open");
  const [search, setSearch] = useState("");

  const filteredSchools = schoolsData[activeTab].filter((school) =>
    school.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Top Bar: Region Select    + Add Button */}
      <div className="flex items-center justify-between mb-4">
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border rounded-md px-3 py-2 w-60"
        >
          <option value="KwaZulu-Natal">KwaZulu-Natal</option>
          <option value="Eastern Cape">Eastern Cape</option>
          <option value="Gauteng">Gauteng</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          + Add Activity
        </button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 mb-4">
        {["Open", "In Progress", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 border-b-2 font-medium ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-gray-300 text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search and Date Filter */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full border px-3 py-2 rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input type="date" className="w-48 border px-3 py-2 rounded-md" />
      </div>

      {/* School Cards */}
      <div>
        {filteredSchools.map((school, index) => (
          <div key={index} className="mb-4 border rounded-lg shadow p-4">
            <div className="flex items-center gap-2 font-semibold text-lg mb-1">
              <School className="w-5 h-5 text-blue-600" />
              {school.name}
            </div>
            <div className="text-sm text-gray-600 flex items-center gap-1 mb-1">
              <MapPin className="w-4 h-4" />
              {school.location}
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-700">
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                {new Date(school.date).toLocaleString()}
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">School Sampling:</span>
                {school.sampling}
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">Lunch Box Check:</span>
                {school.lunchBox}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
