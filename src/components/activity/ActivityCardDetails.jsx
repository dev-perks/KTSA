import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarIcon, GraduationCap, Clock } from "lucide-react";

export default function ActivityCardDetails({ open, onClose, activity }) {
  if (!activity) return null;

  const {
    noOfKids,
    region,
    latitude,
    longitude,
    school,
    samplingDate,
    samplingTime,
    lunchboxDate,
    lunchboxTime,
    samplingPromoter,
    lunchboxPromoter,
  } = activity;

  const city = school?.address;
  const schoolName = school?.name;
  console.log("Activity : ",activity)

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    return new Date(isoDate).toISOString().split("T")[0];
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-100 flex flex-col justify-center items-center max-h-[90vh] sm:rounded-lg w-[95vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] 2xl:w-[40vw]">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Activity Details</DialogTitle>
        </DialogHeader>

        <div className="bg-white shadow rounded-lg mx-0 w-full">
          <div className="px-4 pt-4 pb-4 max-h-[65vh] overflow-y-auto space-y-4">
            <div className="border border-gray-200 rounded-md p-4 space-y-3">
              <h3 className="font-medium text-gray-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-700" />
                {schoolName}
              </h3>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-black">Region:</span> {region}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-black">City:</span> {city}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-black">No of Kids:</span> {noOfKids}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-black">Location:</span>{" "}
                Latitude: {latitude}, Longitude: {longitude}
              </div>
            </div>

            {/* Sampling Activity */}
            <div className="border border-gray-200 rounded-md p-4 space-y-3">
              <div className="text-sm font-medium text-gray-800">Sampling Activity</div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-gray-500" />
                <input
                  type="date"
                  value={formatDate(samplingDate)}
                  readOnly
                  className="flex-1 min-w-[140px] border rounded px-2 py-1 text-sm"
                />

                <Clock className="w-4 h-4 text-gray-500 ml-2" />
                <input
                  type="time"
                  value={samplingTime || ""}
                  readOnly
                  className="border rounded px-2 py-1 text-sm"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-black">Promoter:</span>{" "}
                {samplingPromoter?.name || "Not Assigned"}
              </div>
            </div>

            {/* Lunchbox Activity */}
            <div className="border border-gray-200 rounded-md p-4 space-y-3">
              <div className="text-sm font-medium text-gray-800">Lunchbox Activity</div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-gray-500" />
                <input
                  type="date"
                  value={formatDate(lunchboxDate)}
                  readOnly
                  className="flex-1 min-w-[140px] border rounded px-2 py-1 text-sm"
                />

                <Clock className="w-4 h-4 text-gray-500 ml-2" />
                <input
                  type="time"
                  value={lunchboxTime || ""}
                  readOnly
                  className="border rounded px-2 py-1 text-sm"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-black">Promoter:</span>{" "}
                {lunchboxPromoter?.name || "Not Assigned"}
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
