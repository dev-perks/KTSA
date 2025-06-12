import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import { format, parseISO } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import ActivityCard from "./ActivityCard";
import ActivityCardDetails from "./ActivityCardDetails";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function TabsWithFilters({ selectedRegion }) {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const getActivities = async (region) => {
    if (!region) {
      toast.error("Please select a region");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/admin/activities`, {
        withCredentials: true,
      });

      setActivities(response.data || []);
    } catch (error) {
      console.error("Error fetching activities:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch activities"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getActivities(selectedRegion);
  }, [selectedRegion]);

  const filterActivitiesByStatus = (status) => {
    return activities.filter((activity) => {
      // Filter by region first
      if (activity.region !== selectedRegion) return false;

      // Filter by search term
      const matchesSearch = search
        ? activity.school?.name?.toLowerCase().includes(search.toLowerCase()) ||
          activity.address?.toLowerCase().includes(search.toLowerCase())
        : true;

      // Filter by date
      const matchesDate = selectedDate
        ? (activity.samplingDate &&
            format(parseISO(activity.samplingDate), "yyyy-MM-dd") ===
              format(selectedDate, "yyyy-MM-dd")) ||
          (activity.lunchboxDate &&
            format(parseISO(activity.lunchboxDate), "yyyy-MM-dd") ===
              format(selectedDate, "yyyy-MM-dd"))
        : true;

      if (!matchesSearch || !matchesDate) return false;

      // Filter by status
      switch (status) {
        case "open":
          return (
            !activity.sampleSubmitted &&
            !activity.lunchboxSubmitted &&
            !activity.samplingPromoter &&
            !activity.lunchboxPromoter
          );

        case "progress":
          return (
            (!activity.sampleSubmitted || !activity.lunchboxSubmitted) &&
            (activity.samplingPromoter || activity.lunchboxPromoter)
          );

        case "completed":
          return activity.sampleSubmitted && activity.lunchboxSubmitted;

        default:
          return true;
      }
    });
  };

  const openActivities = filterActivitiesByStatus("open");
  const inProgressActivities = filterActivitiesByStatus("progress");
  const completedActivities = filterActivitiesByStatus("completed");

  const handleRefresh = () => {
    getActivities(selectedRegion);
  };

  return (
    <Tabs defaultValue="open" className="w-full max-w-3xl mx-auto mt-6">
      <div className="flex justify-between items-center mb-4">
        <TabsList className="flex justify-start border-b border-gray-200">
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

        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={loading}
        >
          Refresh
        </Button>
      </div>

      <div className="flex gap-2 mt-4">
        <Input
          placeholder="Search by school or address"
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

      {loading ? (
        <div className="mt-8 text-center text-gray-500">
          Loading activities...
        </div>
      ) : (
        <>
          <TabsContent value="open">
            <div className="mt-4 space-y-4">
              {openActivities.length > 0 ? (
                openActivities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    onClick={() => setSelectedActivity(activity)}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No open activities found.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <div className="mt-4 space-y-4">
              {inProgressActivities.length > 0 ? (
                inProgressActivities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    onClick={() => setSelectedActivity(activity)}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No activities in progress.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="mt-4 space-y-4">
              {completedActivities.length > 0 ? (
                completedActivities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    onClick={() => setSelectedActivity(activity)}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No completed activities.
                </p>
              )}
            </div>
          </TabsContent>
        </>
      )}

      <ActivityCardDetails
        open={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        activity={selectedActivity}
        onActivityUpdated={handleRefresh}
      />
    </Tabs>
  );
}
