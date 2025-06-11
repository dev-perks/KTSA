import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarIcon, GraduationCap, Clock } from "lucide-react";

export default function ActivityCardDetails({ open, onClose, activity }) {
  if (!activity) return null;

  const { name, city, region, activities = [] } = activity;

  // Local copy of activities so we can edit date/time
  const [items, setItems] = useState([]);

  // Whenever the passed-in activity changes, reset our editable copy
  useEffect(() => {
    setItems(activity?.activities?.map((a) => ({ ...a })) || []);
  }, [activity]);

  if (!activity) return null;

  // Handler for date changes
  const handleDateChange = (idx, newDate) => {
    const copy = [...items];
    copy[idx].date = newDate;
    setItems(copy);
  };

  // Handler for time changes
  const handleTimeChange = (idx, newTime) => {
    const copy = [...items];
    copy[idx].time = newTime;
    setItems(copy);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-100 flex flex-col justify-center items-center max-h-[90vh] sm:rounded-lg w-[95vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] 2xl:w-[40vw]">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            Activity Details
          </DialogTitle>
        </DialogHeader>

        {/* School Info Section */}
        <div className="bg-white shadow rounded-lg mx-0 w-full">
          <div className="px-4 pt-4 pb-4 max-h-[65vh] overflow-y-auto space-y-4">
            <div className="border border-gray-200 rounded-md p-4 space-y-3">
              <h3 className="font-medium text-gray-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-700" />
                {name}
              </h3>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-black">Region:</span> {region}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-black">City:</span> {city}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-black">No of Kids:</span> N/A
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-black">Location:</span>{" "}
                Latitude: -, Longitude: -
              </div>
            </div>

            {/* ─── ACTIVITIES LIST ───────────────────────── */}
            <div className="bg-white shadow rounded-lg w-full overflow-y-auto max-h-[60vh]">
              <div className="px-4 py-4 space-y-4">
                {activities.map((item, i) => (
                  <div
                    key={i}
                    className="border border-gray-200 rounded-md p-4 space-y-3"
                  >
                    <div className="text-sm font-medium text-gray-800">
                      {item.name}
                    </div>

                    {/* editable date + time */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <CalendarIcon className="w-4 h-4 text-gray-500" />
                      <input
                        type="date"
                        value={item.date || ""}
                        onChange={(e) => handleDateChange(i, e.target.value)}
                        className="flex-1 min-w-[140px] border rounded px-2 py-1 text-sm"
                      />

                      <Clock className="w-4 h-4 text-gray-500 ml-2" />
                      <input
                        type="time"
                        value={item.time || ""}
                        onChange={(e) => handleTimeChange(i, e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                      />
                    </div>

                    <hr className="border-gray-200 my-2" />

                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-800">
                        Promoters
                      </div>
                      <Button size="sm" variant="outline">
                        Add
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="w-full">
          <Button variant="destructive" className="w-full">
            Delete Activity
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
