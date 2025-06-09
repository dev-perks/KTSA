import React, { useState } from "react";
import {
  MapPin,
  Home,
  Calendar as CalendarIcon,
  ListTodo,
  ChevronDown,
  Clock,
} from "lucide-react";
import { regionOptions } from "../../utils/regions";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddActivity({ initialRegion, onSave }) {
  const [region, setRegion] = useState(initialRegion);
  const [school, setSchool] = useState("");
  const [activityType, setActivityType] = useState("both");

  // Sampling
  const [samplingDate, setSamplingDate] = useState("");
  const [samplingHour, setSamplingHour] = useState("00");
  const [samplingMinute, setSamplingMinute] = useState("00");
  const [samplingPromoters, setSamplingPromoters] = useState(0);
  // Lunch
  const [lunchDate, setLunchDate] = useState("");
  const [lunchHour, setLunchHour] = useState("00");
  const [lunchMinute, setLunchMinute] = useState("00");
  const [lunchPromoters, setLunchPromoters] = useState(0);
  // Others
  const [noOfKids, setNoOfKids] = useState(0);
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      region,
      school,
      activityType,
      sampling: { samplingDate, samplingHour, samplingMinute, samplingPromoters },
      lunch: { lunchDate, lunchHour, lunchMinute, lunchPromoters },
      noOfKids,
      address,
    });
  };

  const showSampling = activityType === "sampling" || activityType === "both";
  const showLunch = activityType === "lunch" || activityType === "both";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-full flex items-center shadow-md transition">
          + Add Activity
        </button>
      </DialogTrigger>

      <DialogContent className="fixed inset-0 sm:inset-auto sm:mx-auto sm:top-1/2 sm:left-1/2 transform sm:-translate-x-1/2 sm:-translate-y-1/2 w-full sm:max-w-lg bg-gray-100 max-h-screen sm:rounded-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Activity</DialogTitle>
        </DialogHeader>

        <div className="bg-white shadow rounded-lg mx-4 sm:mx-0">
          <div className="px-4 pt-4 pb-4 max-h-[75vh] overflow-y-auto">
            <form
              id="activityForm"
              onSubmit={handleSubmit}
              className="grid gap-4"
            >
              {/* Region */}
              <div className="grid gap-1">
                <Label htmlFor="region-select">Region</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <select
                    id="region-select"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="appearance-none w-full pl-9 pr-8 py-2 border rounded-md bg-white text-sm text-gray-700 focus:ring-2 focus:ring-blue-500"
                  >
                    {regionOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* School Name */}
              <div className="grid gap-1">
                <Label htmlFor="school-select">School Name</Label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <select
                    id="school-select"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="appearance-none w-full pl-9 pr-8 py-2 border rounded-md bg-white text-sm text-gray-700 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select school</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* ── Activity Type Card (with nested cards) ── */}
              <div className="border border-gray-200 rounded-md p-4 space-y-4">
                {/* Selector */}
                <div className="grid gap-1">
                  <Label htmlFor="activity-type">Activity Type</Label>
                  <div className="relative">
                    <ListTodo className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <select
                      id="activity-type"
                      value={activityType}
                      onChange={(e) => setActivityType(e.target.value)}
                      className="appearance-none w-full pl-9 pr-8 py-2 border rounded-md bg-white text-sm text-gray-700 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="sampling">School Sampling</option>
                      <option value="lunch">Lunch Box Check</option>
                      <option value="both">Both</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                {/* Nested: School Sampling */}
                {showSampling && (
                  <div className="border border-gray-200 rounded-md p-3">
                    <div className="text-sm font-medium text-gray-800 mb-2">
                      School Sampling
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <CalendarIcon className="w-4 h-4 text-gray-500" />
                      <Input
                        type="date"
                        value={samplingDate}
                        onChange={(e) => setSamplingDate(e.target.value)}
                        className="flex-1 min-w-[120px]"
                      />
                      <Clock className="w-4 h-4 text-gray-500" />
                      <Input
                        type="text"
                        value={samplingHour}
                        onChange={(e) => setSamplingHour(e.target.value)}
                        maxLength={2}
                        placeholder="HH"
                        className="w-12 text-center"
                      />
                      <span>:</span>
                      <Input
                        type="text"
                        value={samplingMinute}
                        onChange={(e) => setSamplingMinute(e.target.value)}
                        maxLength={2}
                        placeholder="MM"
                        className="w-12 text-center"
                      />
                    </div>
                    <hr className="border-gray-200 my-2" />
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-800">
                        Promoters
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setSamplingPromoters((count) => count + 1)
                        }
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                )}

                {/* Nested: Lunch Box Check */}
                {showLunch && (
                  <div className="border border-gray-200 rounded-md p-3">
                    <div className="text-sm font-medium text-gray-800 mb-2">
                      Lunch Box Check
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <CalendarIcon className="w-4 h-4 text-gray-500" />
                      <Input
                        type="date"
                        value={lunchDate}
                        onChange={(e) => setLunchDate(e.target.value)}
                        className="flex-1 min-w-[120px]"
                      />
                      <Clock className="w-4 h-4 text-gray-500" />
                      <Input
                        type="text"
                        value={lunchHour}
                        onChange={(e) => setLunchHour(e.target.value)}
                        maxLength={2}
                        placeholder="HH"
                        className="w-12 text-center"
                      />
                      <span>:</span>
                      <Input
                        type="text"
                        value={lunchMinute}
                        onChange={(e) => setLunchMinute(e.target.value)}
                        maxLength={2}
                        placeholder="MM"
                        className="w-12 text-center"
                      />
                    </div>
                    <hr className="border-gray-200 my-2" />
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-800">
                        Promoters
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setLunchPromoters((c) => c + 1)}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* No of Kids */}
              <div className="grid gap-1">
                <Label htmlFor="kids-input">No of Kids</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setNoOfKids((k) => Math.max(0, k - 1))}
                  >
                    –
                  </Button>
                  <Input
                    id="kids-input"
                    type="number"
                    min={0}
                    value={noOfKids}
                    onChange={(e) => setNoOfKids(Number(e.target.value))}
                    className="w-20 text-center py-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setNoOfKids((k) => k + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Address */}
              <div className="grid gap-1">
                <Label htmlFor="address-input">Address</Label>
                <Input
                  id="address-input"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter address"
                />
              </div>

              {/* Location */}
              <div className="grid gap-1">
                <Label htmlFor="location-btn">Location</Label>
                <Button
                  id="location-btn"
                  variant="outline"
                  className="flex items-center gap-2 justify-center"
                >
                  <MapPin className="w-4 h-4 text-blue-500" />
                  Pick Location
                </Button>
              </div>
            </form>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="activityForm">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
