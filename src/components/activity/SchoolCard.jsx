import { MapPin, Users, ClipboardCheck } from "lucide-react";

export default function SchoolCard({ school }) {
  return (
    <div className="border rounded-md p-4 shadow-sm bg-white">
      <h3 className="font-semibold text-blue-700 flex items-center gap-2">
        <MapPin className="w-4 h-4" /> {school.name}
      </h3>
      <p className="text-sm text-gray-600 mb-2">
        {school.region} - {school.city}
      </p>
      <div className="flex justify-between text-sm text-gray-800">
        <span>{school.activities[0]}</span>
        <span>{school.activities[1]}</span>
      </div>
      <div className="mt-2 flex justify-between text-xs text-gray-500">
        <span>
          {school.date} {school.time}
        </span>
        <span className="flex gap-2 items-center">
          <Users className="w-4 h-4" /> {school.assigned}
          <ClipboardCheck className="w-4 h-4" /> {school.completed}
        </span>
      </div>
    </div>
  );
}
