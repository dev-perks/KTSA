import React from "react";
import { MapPin, Users, CalendarClock, GraduationCap } from "lucide-react";

export default function ActivityCard({ activityDetails }) {
  return (
    <div className="border rounded-md p-4 shadow-sm bg-white space-y-3">
      {/* School Name */}
      <h3 className="font-semibold text-black flex items-center gap-2">
        <GraduationCap className="w-4 h-4 text-blue-700" />
        {activityDetails.name}
      </h3>

      {/* Region & City */}
      <p className="text-sm text-gray-600 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-gray-500" />
        {activityDetails.region} - {activityDetails.city}
      </p>

      {/* Separator line */}
      <hr className="border-gray-200" />

      {/* Each activity with its own date/time and promoter count */}
      {activityDetails.activities.map((item) => (
        <div
          key={item.name}
          className="flex justify-between items-center text-sm text-gray-800"
        >
          <span className="">{item.name}</span>
          <span className="flex items-center gap-2 text-xs">
            <CalendarClock className="w-4 h-4" />
            {item.date} {item.time}
          </span>
          <span className="flex items-center gap-2 text-xs">
            <Users className="w-4 h-4" />
            {item.promoters}
          </span>
        </div>
      ))}
    </div>
  );
}
