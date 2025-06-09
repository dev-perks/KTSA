import React from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { regionOptions } from "../../utils/regions";
import AddActivity from "./AddActivity";

export default function RegionFilterHeader({
  selectedRegion,
  onRegionChange,
  onActivitySave,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-blue-50 p-4 rounded-md max-w-3xl mx-auto shadow-sm gap-3">
      {/* Region selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          School List
        </label>
        <div className="relative w-56">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <select
            value={selectedRegion}
            onChange={(e) => onRegionChange(e.target.value)}
            className="appearance-none w-full pl-9 pr-8 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm text-gray-700"
          >
            {regionOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* Pull in the new AddActivity component */}
      <AddActivity initialRegion={selectedRegion} onSave={onActivitySave} />
    </div>
  );
}
