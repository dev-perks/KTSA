import React, { useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { regionOptions } from "../utils/regions";

export default function SchoolListHeader() {
  const [selectedRegion, setSelectedRegion] = useState(regionOptions[0].value);

  return (
    <div className="flex items-center justify-between bg-blue-50 p-4 rounded-md max-w-3xl mx-auto shadow-sm">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          School List
        </label>
        <div className="relative w-56">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="appearance-none w-full pl-9 pr-8 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm text-gray-700"
          >
            {regionOptions.map((region) => (
              <option key={region.value} value={region.value}>
                {region.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-full flex items-center shadow-md transition">
        + Add Activity
      </button>
      
    </div>
  );
}
