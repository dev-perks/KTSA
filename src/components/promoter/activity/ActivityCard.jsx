import React from "react";
import { MapPin, Users, CalendarClock, GraduationCap } from "lucide-react";

export default function ActivityCard({ activityDetails, onClick }) {
  const isSamplingCompleted = activityDetails.sampleSubmitted;
  const isLunchboxCompleted = activityDetails.lunchboxSubmitted;
  const isInProgress = 
    (activityDetails.activityType === "SCHOOL_SAMPLING" && !isSamplingCompleted) || 
    (activityDetails.activityType === "LUNCHBOX_CHECK" && !isLunchboxCompleted);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div
      className="border rounded-md p-4 shadow-sm bg-white space-y-3 cursor-pointer hover:shadow-md transition "
      onClick={onClick}
    >
      {/* Header: School Name and status icon */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-black flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-blue-700" />
          {activityDetails.school?.name || "Unknown School"}
        </h3>
        {isSamplingCompleted || isLunchboxCompleted ? (
          <FaRegCheckCircle className="text-green-500" />
        ) : isInProgress ? (
          <FaRegDotCircle className="text-yellow-500" />
        ) : (
          <FaRegCircle className="text-gray-400" />
        )}
      </div>

      {/* Region & Address */}
      <p className="text-sm text-gray-600 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-gray-500" />
        {activityDetails.region} - {activityDetails.address}
      </p>

      <hr className="border-gray-200" />

      {/* Activities rows */}
      <div className="grid grid-cols-[120px_152px_32px] items-center justify-between">
        <span className="text-sm text-gray-800">
          {activityDetails.activityType === "SCHOOL_SAMPLING" 
            ? "School Sampling" 
            : "Lunchbox Check"}
        </span>
        <span className="flex items-center gap-2 text-xs text-gray-600">
          <CalendarClock className="w-4 h-4" />
          {formatDate(
            activityDetails.activityType === "SCHOOL_SAMPLING" 
              ? activityDetails.samplingDate 
              : activityDetails.lunchboxDate
          )}{" "}
          {activityDetails.activityType === "SCHOOL_SAMPLING" 
            ? activityDetails.samplingTime 
            : activityDetails.lunchboxTime}
        </span>
        <span className="flex items-center gap-2 text-xs text-gray-600">
          <Users className="w-4 h-4" />
          {activityDetails.noOfKids}
        </span>
      </div>
    </div>
  );
}