import {
  MapPin,
  Users,
  ClipboardCheck,
  GraduationCap,
  CalendarClock,
  ListTodo,
} from "lucide-react"; // Optional: you can replace ListTodo with another icon

export default function SchoolCard({ school }) {
  return (
    <div className="border rounded-md p-4 shadow-sm bg-white space-y-2">
      {/* School Name */}
      <h3 className="font-semibold text-blue-700 flex items-center gap-2">
        <GraduationCap className="w-4 h-4" />
        {school.name}
      </h3>

      {/* Region & City */}
      <p className="text-sm text-gray-600 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-gray-500" />
        {school.region} - {school.city}
      </p>

      {/* Activities with icons & alignment */}
      <div className="flex items-start gap-2 text-sm text-gray-800">
        <ListTodo className="w-4 h-4 mt-0.5 text-gray-600" />
        <div className="flex w-full justify-between">
          <span>{school.activities[0]}</span>
          <span>{school.activities[1]}</span>
        </div>
      </div>

      {/* Date & Status */}
      <div className="mt-1 flex justify-between text-xs text-gray-500 items-center">
        <span className="flex items-center gap-2">
          <CalendarClock className="w-4 h-4" />
          {school.date} {school.time}
        </span>
        <span className="flex gap-3 items-center">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {school.assigned}
          </span>
          <span className="flex items-center gap-1">
            <ClipboardCheck className="w-4 h-4" />
            {school.completed}
          </span>
        </span>
      </div>
    </div>
  );
}
