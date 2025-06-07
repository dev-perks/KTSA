import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { schools } from "../utils/schools";
import SchoolCard from "./SchoolCard";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

export default function ActivityTabs({ selectedRegion }) {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const filteredSchools = schools.filter((school) => {
    const selected = "Eastern Cape";
    if (school.region !== selected) return false;

    const matchesSearch = search
      ? school.name.toLowerCase().includes(search.toLowerCase())
      : true;

    const matchesDate = selectedDate
      ? school.date === format(selectedDate, "yyyy-MM-dd")
      : true;

    return matchesSearch && matchesDate;
  });

  return (
    <Tabs defaultValue="open" className="w-full max-w-3xl mx-auto">
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
          {filteredSchools.map((school) => (
            <SchoolCard key={school.id} school={school} />
          ))}
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
