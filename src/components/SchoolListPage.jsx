import React, { useState } from "react";
import {
  MapPin,
  ChevronDown,
  Users,
  ClipboardCheck,
  CalendarIcon,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

// Sample data (replace with import)
const regionOptions = [
  { label: "Eastern Cape", value: "Eastern Cape" },
  { label: "KwaZulu-Natal", value: "KwaZulu-Natal" },
];

const schools = [
  {
    id: 1,
    name: "NEW GARDENS PRIMARY",
    region: "Eastern Cape",
    city: "Stutterheim",
    date: "2025-05-29",
    time: "11:30 AM",
    activities: ["School Sampling", "Lunch Box Check"],
    assigned: 1,
    completed: 0,
  },
  {
    id: 2,
    name: "NDAKANA PRIMARY SCHOOL",
    region: "Eastern Cape",
    city: "Stutterheim",
    date: "2025-05-29",
    time: "11:30 AM",
    activities: ["School Sampling", "Lunch Box Check"],
    assigned: 1,
    completed: 0,
  },
  {
    id: 3,
    name: "UMTHATHA COMMUNITY PRIMARY SCHOOL",
    region: "Eastern Cape",
    city: "Umthatha",
    date: "2025-05-28",
    time: "11:30 AM",
    activities: ["School Sampling", "Lunch Box Check"],
    assigned: 1,
    completed: 0,
  },
  {
    id: 4,
    name: "DURBAN CENTRAL PRIMARY",
    region: "KwaZulu-Natal",
    city: "Durban",
    date: "2025-06-07",
    time: "10:00 AM",
    activities: ["Health Survey", "Lunch Box Check"],
    assigned: 2,
    completed: 1,
  },
];

// Header component with region selector
function SchoolListHeader({ selectedRegion, onRegionChange }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-blue-50 p-4 rounded-md max-w-3xl mx-auto shadow-sm gap-3">
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

// Card component
function SchoolCard({ school }) {
  return (
    <div className="border rounded-md p-4 shadow-sm bg-white">
      <h3 className="font-semibold text-blue-700 flex items-center gap-2">
        <MapPin className="w-4 h-4" /> {school.name}
      </h3>
      <p className="text-sm text-gray-600 mb-2">
        {school.region} - {school.city}
      </p>
      <div className="flex justify-between text-sm text-gray-800">
        <span>{school.activities[0]}</span>
        <span>{school.activities[1]}</span>
      </div>
      <div className="mt-2 flex justify-between text-xs text-gray-500">
        <span>
          {school.date} {school.time}
        </span>
        <span className="flex gap-2 items-center">
          <Users className="w-4 h-4" /> {school.assigned}
          <ClipboardCheck className="w-4 h-4" /> {school.completed}
        </span>
      </div>
    </div>
  );
}

// Tabs and filter logic
function ActivityTabs({ selectedRegion }) {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const filteredSchools = schools.filter((school) => {
    if (school.region !== selectedRegion) return false;

    const matchesSearch = search
      ? school.name.toLowerCase().includes(search.toLowerCase())
      : true;

    const matchesDate = selectedDate
      ? school.date === format(selectedDate, "yyyy-MM-dd")
      : true;

    return matchesSearch && matchesDate;
  });

  return (
    <Tabs defaultValue="open" className="w-full max-w-3xl mx-auto mt-6">
      <TabsList className="w-full flex justify-start border-b border-gray-200">
        <TabsTrigger
          value="open"
          className="relative px-4 py-2 text-sm font-medium text-gray-700 data-[state=active]:text-black data-[state=active]:font-semibold"
        >
          Open
          <span className="absolute bottom-0 left-0 h-[2px] w-full bg-blue-500 data-[state=active]:block hidden" />
        </TabsTrigger>
        <TabsTrigger
          value="progress"
          className="relative px-4 py-2 text-sm font-medium text-gray-500 data-[state=active]:text-black data-[state=active]:font-semibold"
        >
          In Progress
          <span className="absolute bottom-0 left-0 h-[2px] w-full bg-blue-500 data-[state=active]:block hidden" />
        </TabsTrigger>
        <TabsTrigger
          value="completed"
          className="relative px-4 py-2 text-sm font-medium text-gray-500 data-[state=active]:text-black data-[state=active]:font-semibold"
        >
          Completed
          <span className="absolute bottom-0 left-0 h-[2px] w-full bg-blue-500 data-[state=active]:block hidden" />
        </TabsTrigger>
      </TabsList>

      <div className="flex gap-2 mt-4">
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[200px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? (
                format(selectedDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <TabsContent value="open">
        <div className="mt-4 space-y-4">
          {filteredSchools.length > 0 ? (
            filteredSchools.map((school) => (
              <SchoolCard key={school.id} school={school} />
            ))
          ) : (
            <p className="text-sm text-gray-500">No schools found.</p>
          )}
        </div>
      </TabsContent>

      <TabsContent value="progress">
        <div className="mt-4 text-sm text-gray-500">No progress items yet.</div>
      </TabsContent>

      <TabsContent value="completed">
        <div className="mt-4 text-sm text-gray-500">
          No completed items yet.
        </div>
      </TabsContent>
    </Tabs>
  );
}

// 💡 Final page combining both components
export default function SchoolListPage() {
  const [selectedRegion, setSelectedRegion] = useState(regionOptions[0].value);

  return (
    <div className="p-4">
      <SchoolListHeader
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
      />
      <ActivityTabs selectedRegion={selectedRegion} />
    </div>
  );
}
