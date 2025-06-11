import React from "react";
import { MapPin, Users, CalendarClock, GraduationCap } from "lucide-react";
import { FaRegCircle, FaRegDotCircle, FaRegCheckCircle } from "react-icons/fa";

export default function ActivityCard({ activityDetails, onClick }) {
  const isCompleted = activityDetails.completed;
  const isInProgress =
    !isCompleted &&
    activityDetails.activities.some((item) => item.promoters > 0);

  const StatusIcon = isCompleted
    ? FaRegCheckCircle
    : isInProgress
    ? FaRegDotCircle
    : FaRegCircle;
  const statusColor = isCompleted
    ? "text-green-500"
    : isInProgress
    ? "text-yellow-500"
    : "text-gray-600";

  return (
    <div
      className="border rounded-md p-4 shadow-sm bg-white space-y-3 cursor-pointer hover:shadow-md transition"
      onClick={onClick}
    >
      {/* Header: School Name and status icon */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-black flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-blue-700" />
          {activityDetails.name}
        </h3>
        <StatusIcon className={`w-5 h-5 ${statusColor}`} />
      </div>

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
          className="grid grid-cols-[120px_152px_32px] items-center justify-between"
        >
          <span className="text-sm text-gray-800">{item.name}</span>
          <span className="flex items-center gap-2 text-xs text-gray-600">
            <CalendarClock className="w-4 h-4" />
            {item.date} {item.time}
          </span>
          <span className="flex items-center gap-2 text-xs text-gray-600">
            <Users className="w-4 h-4" />
            {item.promoters}
          </span>
        </div>
      ))}
    </div>
  );
}
