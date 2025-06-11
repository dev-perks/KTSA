import React from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { regionOptions } from "../../utils/regions";
import AddActivity from "./AddActivity";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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
          Region List
        </label>
        <div className="relative w-52 max-w-xs">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
          <Select value={selectedRegion} onValueChange={onRegionChange}>
            <SelectTrigger className="pl-9 pr-8 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm text-gray-700 w-full">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              {regionOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Pull in the new AddActivity component */}
      <AddActivity initialRegion={selectedRegion} onSave={onActivitySave} />
    </div>
  );
}
