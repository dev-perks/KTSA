import React from "react";
import { MapPin, Users, CalendarClock, GraduationCap } from "lucide-react";
import { FaRegCircle, FaRegDotCircle, FaRegCheckCircle } from "react-icons/fa";
import { format, parseISO } from "date-fns";

export default function ActivityCard({ activity, onClick }) {
  const isCompleted = activity.sampleSubmitted && activity.lunchboxSubmitted;
  const isInProgress = 
    (!activity.sampleSubmitted || !activity.lunchboxSubmitted) && 
    (activity.samplingPromoterId || activity.lunchboxPromoterId);

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

  const getActivityItems = () => {
    const items = [];
    
    if (activity.activityType === 'SCHOOL_SAMPLING' || activity.activityType === 'BOTH') {
      items.push({
        name: 'School Sampling',
        date: activity.samplingDate ? format(parseISO(activity.samplingDate), 'MMM dd, yyyy') : 'Not scheduled',
        time: activity.samplingTime || '',
        promoters: activity.samplingPromoterId ? 1 : 0,
        completed: activity.sampleSubmitted
      });
    }
    
    if (activity.activityType === 'LUNCHBOX_CHECK' || activity.activityType === 'BOTH') {
      items.push({
        name: 'Lunchbox Check',
        date: activity.lunchboxDate ? format(parseISO(activity.lunchboxDate), 'MMM dd, yyyy') : 'Not scheduled',
        time: activity.lunchboxTime || '',
        promoters: activity.lunchboxPromoterId ? 1 : 0,
        completed: activity.lunchboxSubmitted
      });
    }
    
    return items;
  };

  return (
    <div
      className="border rounded-md p-4 shadow-sm bg-white space-y-3 cursor-pointer hover:shadow-md transition"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-black flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-blue-700" />
          {activity.school?.name || 'No school assigned'}
        </h3>
        <StatusIcon className={`w-5 h-5 ${statusColor}`} />
      </div>

      <p className="text-sm text-gray-600 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-gray-500" />
        {activity.region} - {activity.address}
      </p>

      <hr className="border-gray-200" />

      {getActivityItems().map((item) => (
        <div
          key={item.name}
          className="grid grid-cols-[120px_152px_32px] items-center justify-between"
        >
          <span className={`text-sm ${item.completed ? 'text-green-600' : 'text-gray-800'}`}>
            {item.name}
          </span>
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