import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../ui/select";
import { Input } from "../../ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "../../ui/popover";
import { Calendar } from "../../ui/calendar";
import { Button } from "../../ui/button";
import ActivityCard from "./ActivityCard";
import PromoterDetails from "./PromoterDetails";
import { Calendar as CalendarIcon } from "lucide-react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Activity() {
  const [region, setRegion] = useState();
  const [activities, setActivities] = useState([]);
  const [tab, setTab] = useState("assigned");
  const [search, setSearch] = useState("");
  const [date, setDate] = useState();
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    const fetchedData = async () => {
      const response = await axios.get(`${BASE_URL}/promoter/activity`, {
        withCredentials: true,
      });
      const data = response.data.activities;
      console.log("Data : ", data);
      setActivities(data);
    };
    fetchedData();
  }, []);

  const regions = Array.from(new Set(activities.map((a) => a.region)));
  
  const filtered = activities.filter((item) => {
    const matchRegion = region ? item.region === region : true;
    const matchSearch = item.school.name.toLowerCase().includes(search.toLowerCase());
    const matchDate = date
      ? (item.samplingDate && new Date(item.samplingDate).toISOString().slice(0, 10) === date.toISOString().slice(0, 10)) ||
        (item.lunchboxDate && new Date(item.lunchboxDate).toISOString().slice(0, 10) === date.toISOString().slice(0, 10))
      : true;
    return matchRegion && matchSearch && matchDate;
  });

  const assignedItems = filtered.filter((item) => 
    (item.activityType === "SCHOOL_SAMPLING" && !item.sampleSubmitted) ||
    (item.activityType === "LUNCHBOX_CHECK" && !item.lunchboxSubmitted)
  );
  
  const completedItems = filtered.filter((item) => 
    (item.activityType === "SCHOOL_SAMPLING" && item.sampleSubmitted) ||
    (item.activityType === "LUNCHBOX_CHECK" && item.lunchboxSubmitted)
  );

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 px-4 lg:px-0 space-y-6">
      {/* Region / Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger className=" sm:w-48">
            <SelectValue placeholder="All regions" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex sm:flex-row gap-2 w-full sm:w-auto">
        <Input
          placeholder="Search by school"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className=" sm:w-[200px] justify-start text-left"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? date.toLocaleDateString() : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="w-full flex border-b border-gray-200">
          <TabsTrigger
            value="assigned"
            className="px-4 py-2 text-sm font-medium text-gray-700 
                       data-[state=active]:text-black data-[state=active]:font-semibold"
          >
            Assigned
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="px-4 py-2 text-sm font-medium text-gray-500 
                       data-[state=active]:text-black data-[state=active]:font-semibold"
          >
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assigned">
          <div className="mt-4 space-y-4 max-h-[60vh] ">
            {assignedItems.length ? (
              assignedItems.map((item) => (
                <ActivityCard
                  key={item.id}
                  activityDetails={item}
                  onClick={() => setSelectedActivity(item)}
                />
              ))
            ) : (
              <p className="text-center text-sm text-gray-500">
                No assigned items.
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="mt-4 space-y-4 max-h-[60vh] ">
            {completedItems.length ? (
              completedItems.map((item) => (
                <ActivityCard
                  key={item.id}
                  activityDetails={item}
                  onClick={() => setSelectedActivity(item)}
                />
              ))
            ) : (
              <p className="text-center text-sm text-gray-500">
                No completed items.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Details Modal */}
      <PromoterDetails
        open={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        activity={selectedActivity}
      />
    </div>
  );
}