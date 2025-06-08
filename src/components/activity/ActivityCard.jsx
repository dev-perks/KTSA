import {
  MapPin,
  Users,
  ClipboardCheck,
  GraduationCap,
  CalendarClock,
  ListTodo,
} from "lucide-react";

export default function ActivityCard({ activityDetails }) {
  return (
    <div className="border rounded-md p-4 shadow-sm bg-white space-y-2">
      {/* School Name */}
      <h3 className="font-semibold text-blue-700 flex items-center gap-2">
        <GraduationCap className="w-4 h-4" />
        {activityDetails.name}
      </h3>

      {/* Region & City */}
      <p className="text-sm text-gray-600 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-gray-500" />
        {activityDetails.region} - {activityDetails.city}
      </p>

      {/* Activities with icons & alignment */}
      <div className="flex items-start gap-2 text-sm text-gray-800">
        <ListTodo className="w-4 h-4 mt-0.5 text-gray-600" />
        <div className="flex w-full justify-between">
          <span>{activityDetails.activities[0]}</span>
          <span>{activityDetails.activities[1]}</span>
        </div>
      </div>

      {/* Date & Status */}
      <div className="mt-1 flex justify-between text-xs text-gray-500 items-center">
        <span className="flex items-center gap-2">
          <CalendarClock className="w-4 h-4" />
          {activityDetails.date} {activityDetails.time}
        </span>
        <span className="flex gap-3 items-center">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {activityDetails.assigned}
          </span>
          <span className="flex items-center gap-1">
            <ClipboardCheck className="w-4 h-4" />
            {activityDetails.completed}
          </span>
        </span>
      </div>
    </div>
  );
}
