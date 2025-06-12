import React, { useState } from "react";
import {
  MapPin,
  Home,
  Calendar as CalendarIcon,
  ListTodo,
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

import AddPromoters from "./AddPromoters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
      sampling: {
        samplingDate,
        samplingHour,
        samplingMinute,
        samplingPromoters,
      },
      lunch: { lunchDate, lunchHour, lunchMinute, lunchPromoters },
      noOfKids,
      address,
    });
  };

  const showSampling = activityType === "sampling" || activityType === "both";
  const showLunch = activityType === "lunch" || activityType === "both";

  const [promoterModal, setPromoterModal] = useState({
    open: false,
    type: null,
  });

  const [samplingPromotersList, setSamplingPromotersList] = useState([]);
  const [lunchPromotersList, setLunchPromotersList] = useState([]);

  const allPromoters = [];

  const openPromoterModal = (type) => setPromoterModal({ open: true, type });
  const closePromoterModal = () =>
    setPromoterModal({ open: false, type: null });

  const handlePromoterSelect = (selected, type) => {
    if (type === "sampling") setSamplingPromotersList(selected);
    else if (type === "lunch") setLunchPromotersList(selected);
    closePromoterModal();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 flex items-center">
          + Add Activity
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-gray-100 flex flex-col justify-center items-center max-h-[90vh] sm:rounded-lg w-[95vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] 2xl:w-[40vw]">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Add Activity</DialogTitle>
        </DialogHeader>

        <div className="bg-white shadow rounded-lg mx-0 sm:mx-0">
          <div className="px-4 pt-4 pb-4 max-h-[60vh] sm:max-h-[65vh] overflow-y-auto">
            <form
              id="activityForm"
              onSubmit={handleSubmit}
              className="grid gap-4"
            >
              {/* Region */}
              <div className="grid gap-1">
                <Label htmlFor="region-select">Region</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger className="pl-9 pr-8 py-2 border rounded-md bg-white text-sm text-gray-700 w-full focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regionOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* School Name */}
              <div className="grid gap-1">
                <Label htmlFor="school-select">School Name</Label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
                  <Select value={school} onValueChange={setSchool}>
                    <SelectTrigger className="pl-9 pr-8 py-2 border rounded-md bg-white text-sm text-gray-700 w-full focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select school" />
                    </SelectTrigger>
                    <SelectContent>
                      {regionOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Activity Type Card */}
              <div className="border border-gray-200 rounded-md p-4 space-y-4">
                {/* Activity Type */}
                <div className="grid gap-1">
                  <Label htmlFor="activity-type">Activity Type</Label>
                  <div className="relative">
                    <ListTodo className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
                    <Select
                      value={activityType}
                      onValueChange={setActivityType}
                    >
                      <SelectTrigger className="pl-9 pr-8 py-2 border rounded-md bg-white text-sm text-gray-700 w-full focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select activity type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sampling">
                          School Sampling
                        </SelectItem>
                        <SelectItem value="lunch">Lunch Box Check</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
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
                      <div className="flex items-center gap-1">
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
                    </div>
                    <hr className="border-gray-200 my-2" />
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-800">
                        Promoters
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openPromoterModal("sampling")}
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
                      <div className="flex items-center gap-1">
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
                    </div>
                    <hr className="border-gray-200 my-2" />
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-800">
                        Promoters
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openPromoterModal("lunch")}
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

        <DialogFooter className="flex flex-col sm:flex-row gap-2 md:gap-4 sm:gap-0 sm:px-4 w-full">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="activityForm">
            Save
          </Button>
        </DialogFooter>

        <AddPromoters
          isOpen={promoterModal.open}
          type={promoterModal.type}
          allPromoters={allPromoters}
          alreadySelected={
            promoterModal.type === "sampling"
              ? samplingPromotersList
              : lunchPromotersList
          }
          onSelect={handlePromoterSelect}
          onClose={closePromoterModal}
        />
      </DialogContent>
    </Dialog>
  );
}
