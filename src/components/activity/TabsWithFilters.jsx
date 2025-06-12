import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import { activityDetails } from "../../utils/activityDetails";
import ActivityCard from "./ActivityCard";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import ActivityCardDetails from "./ActivityCardDetails";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function TabsWithFilters({ selectedRegion }) {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const getActivity = async (region) => {
    if (!region) {
      toast.error("Please select any region");
      return;
    }

    const response = await axios.get(`${BASE_URL}/admin/activities`, {
      withCredentials: true,
    });

    console.log("Response Data : ", response.data);
  };
  useEffect(() => {
    getActivity(selectedRegion);
  }, [selectedRegion]);

  // Base filter: region, search term, and date (matches any activity date)
  const baseFiltered = activityDetails.filter((activity) => {
    if (activity.region !== selectedRegion) return false;
    const matchesSearch = search
      ? activity.name.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesDate = selectedDate
      ? activity.activities.some(
          (item) => item.date === format(selectedDate, "yyyy-MM-dd")
        )
      : true;
    return matchesSearch && matchesDate;
  });

  // Status-based lists:
  const openActivities = baseFiltered.filter(
    (act) =>
      !act.completed && act.activities.every((item) => item.promoters === 0)
  );
  const inProgressActivities = baseFiltered.filter(
    (act) => !act.completed && act.activities.some((item) => item.promoters > 0)
  );
  const completedActivities = baseFiltered.filter((act) => act.completed);

  const [selectedActivity, setSelectedActivity] = useState(null);

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
          {openActivities.length > 0 ? (
            openActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activityDetails={activity}
                onClick={() => setSelectedActivity(activity)}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">No open activities.</p>
          )}
        </div>
      </TabsContent>

      <TabsContent value="progress">
        <div className="mt-4 space-y-4">
          {inProgressActivities.length > 0 ? (
            inProgressActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activityDetails={activity}
                onClick={() => setSelectedActivity(activity)}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">No activities in progress.</p>
          )}
        </div>
      </TabsContent>

      <TabsContent value="completed">
        <div className="mt-4 space-y-4">
          {completedActivities.length > 0 ? (
            completedActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activityDetails={activity}
                onClick={() => setSelectedActivity(activity)}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">No completed activities.</p>
          )}
        </div>
      </TabsContent>

      {/* Modal Component */}
      <ActivityCardDetails
        open={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        activity={selectedActivity}
      />
    </Tabs>
  );
}
